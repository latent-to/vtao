// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-ledger'
import '@layerzerolabs/toolbox-hardhat'

import {
    HardhatUserConfig,
    HttpNetworkAccountsUserConfig,
    HttpNetworkUserConfig,
    RequestArguments,
} from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'
import './tasks/sendOFT'
import './tasks/oappAdmin'

// hardhat-ledger forwards eth_accounts to the HTTP RPC. Nodies (and most
// public nodes) reject it, which breaks lz:oapp:wire peer checks. Answer
// with the configured Ledger addresses instead.
const { LedgerProvider } = require('@nomicfoundation/hardhat-ledger/dist/src/provider') as {
    LedgerProvider: {
        prototype: {
            request: (args: RequestArguments) => Promise<unknown>
            options: { accounts: string[] }
            _wrappedProvider: { request: (args: RequestArguments) => Promise<unknown> }
        }
    }
}
const originalLedgerRequest = LedgerProvider.prototype.request
LedgerProvider.prototype.request = async function (this: typeof LedgerProvider.prototype, args: RequestArguments) {
    if (args.method === 'eth_accounts') {
        try {
            const inner = (await this._wrappedProvider.request(args)) as string[]
            return [...inner, ...this.options.accounts]
        } catch {
            return this.options.accounts
        }
    }
    return originalLedgerRequest.call(this, args)
}

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

// Ledger: set LEDGER_ADDRESS and USE_LEDGER=true to sign with the device instead of PRIVATE_KEY
const LEDGER_ADDRESS = process.env.LEDGER_ADDRESS
const USE_LEDGER = ['1', 'true', 'yes'].includes((process.env.USE_LEDGER || '').toLowerCase())

const TESTNET_ERC20 = process.env.TESTNET_ERC20 || null
const MAINNET_ERC20 = process.env.MAINNET_ERC20 || null

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (USE_LEDGER && !LEDGER_ADDRESS) {
    console.warn('USE_LEDGER is set but LEDGER_ADDRESS is missing. Transactions will not be signable.')
} else if (!USE_LEDGER && accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

function networkAccounts(): Pick<HttpNetworkUserConfig, 'accounts' | 'ledgerAccounts'> {
    if (USE_LEDGER && LEDGER_ADDRESS) {
        return { ledgerAccounts: [LEDGER_ADDRESS] }
    }
    return { accounts }
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        // --- added networks ---
        'base-sepolia-testnet': {
            eid: EndpointId.BASESEP_V2_TESTNET,
            url: process.env.RPC_URL_BASE_SEPOLIA || 'https://base-sepolia-rpc.publicnode.com',
            ...networkAccounts(),
        },
        'base-mainnet': {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE_MAINNET || 'https://base.llamarpc.com',
            ...networkAccounts(),
        },
        'subevm-testnet': {
            eid: EndpointId.SUBTENSOREVM_V2_TESTNET,
            url: process.env.RPC_URL_SUBEVM_TESTNET,
            ...networkAccounts(),
            oftAdapter: {
                tokenAddress: TESTNET_ERC20 || '', // Set the token address for the OFT adapter
            },
        },
        'subevm-mainnet': {
            eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
            url: process.env.RPC_URL_SUBEVM_MAINNET,
            ...networkAccounts(),
            oftAdapter: {
                tokenAddress: MAINNET_ERC20 || '', // Set the token address for the OFT adapter
            },
        },
        'arbitrum-mainnet': {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM_MAINNET || 'https://arb1.arbitrum.io/rpc',
            ...networkAccounts(),
        },
        'arbitrum-testnet': {
            eid: EndpointId.ARBSEP_V2_TESTNET,
            url: process.env.RPC_URL_ARB_SEPOLIA || 'https://sepolia-rollup.arbitrum.io/rpc',
            ...networkAccounts(),
        },
        'avalanche-mainnet': {
            eid: EndpointId.AVALANCHE_V2_MAINNET,
            url: process.env.RPC_URL_AVALANCHE_MAINNET || 'https://1rpc.io/avax/c',
            ...networkAccounts(),
        },
        'ethereum-mainnet': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM_MAINNET || 'https://eth.llamarpc.com',
            ...networkAccounts(),
        },
        'ethereum-sepolia': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_ETHEREUM_SEPOLIA || 'https://eth-sepolia.api.onfinality.io/public',
            ...networkAccounts(),
        },
        'bsc-mainnet': {
            eid: EndpointId.BSC_V2_MAINNET,
            url: process.env.RPC_URL_BSC_MAINNET || 'https://bsc-rpc.publicnode.com',
            ...networkAccounts(),
            gasPrice: 150_000_000, // 0.15 gwei - above minimum of 0.1 gwei (error showed min 100000000 wei)
        },
        'bsc-testnet': {
            eid: EndpointId.BSC_V2_TESTNET,
            url: process.env.RPC_URL_BSC_TESTNET || 'https://bnb-testnet.api.onfinality.io/public',
            ...networkAccounts(),
            gasPrice: 150_000_000, // 0.15 gwei for testnet
        },
        'bera-mainnet': {
            eid: EndpointId.BERA_V2_MAINNET,
            url: process.env.RPC_URL_BERA_MAINNET || 'https://rpc.berachain.com/',
            ...networkAccounts(),
        },
        'bera-testnet': {
            eid: EndpointId.BERA_V2_TESTNET,
            url: process.env.RPC_URL_BERA_TESTNET || 'https://bepolia.rpc.berachain.com/',
            ...networkAccounts(),
        },
        'optimism-mainnet': {
            eid: EndpointId.OPTIMISM_V2_MAINNET,
            url: process.env.RPC_URL_OPTIMISM_MAINNET || 'https://opt.llamarpc.com',
            ...networkAccounts(),
        },
        'optimism-testnet': {
            eid: EndpointId.OPTSEP_V2_TESTNET,
            url: process.env.RPC_URL_OP_SEPOLIA || 'https://optimism-sepolia.api.onfinality.io/public',
            ...networkAccounts(),
        },
        'polygon-mainnet': {
            eid: EndpointId.POLYGON_V2_MAINNET,
            url: process.env.RPC_URL_POLYGON_MAINNET || 'https://polygon.llamarpc.com',
            ...networkAccounts(),
        },
        'polygon-testnet': {
            eid: EndpointId.POLYGON_V2_TESTNET,
            url: process.env.RPC_URL_POLYGON_TESTNET || 'https://polygon-amoy.api.onfinality.io/public',
            ...networkAccounts(),
        },
        'gnosis-mainnet': {
            eid: EndpointId.GNOSIS_V2_MAINNET,
            url: process.env.RPC_URL_GNOSIS_MAINNET || 'https://rpc.gnosischain.com',
            ...networkAccounts(),
        },
        'gnosis-testnet': {
            eid: EndpointId.GNOSIS_V2_TESTNET,
            url: process.env.RPC_URL_GNOSIS_TESTNET || 'https://gnosis-chiado-rpc.publicnode.com',
            ...networkAccounts(),
        },

        'tron-mainnet': {
            eid: EndpointId.TRON_V2_MAINNET,
            url: process.env.RPC_URL_TRON_MAINNET || 'https://rpc.tron.network',
            ...networkAccounts(),
        },

        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
