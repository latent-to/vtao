// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'

import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'
import './tasks/sendOFT'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const TESTNET_ERC20 = process.env.TESTNET_ERC20 || null
const MAINNET_ERC20 = process.env.MAINNET_ERC20 || null

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
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
            accounts,
        },
        'base-mainnet': {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE_MAINNET || 'https://base.llamarpc.com',
            accounts,
        },
        'subevm-testnet': {
            eid: EndpointId.SUBTENSOREVM_V2_TESTNET,
            url: process.env.RPC_URL_SUBEVM_TESTNET,
            accounts,
            oftAdapter: {
                tokenAddress: TESTNET_ERC20 || '', // Set the token address for the OFT adapter
            },
        },
        'subevm-mainnet': {
            eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
            url: process.env.RPC_URL_SUBEVM_MAINNET,
            accounts,
            oftAdapter: {
                tokenAddress: MAINNET_ERC20 || '', // Set the token address for the OFT adapter
            },
        },
        'arbitrum-mainnet': {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM_MAINNET || 'https://arb1.arbitrum.io/rpc',
            accounts,
        },
        'arbitrum-testnet': {
            eid: EndpointId.ARBSEP_V2_TESTNET,
            url: process.env.RPC_URL_ARB_SEPOLIA || 'https://sepolia-rollup.arbitrum.io/rpc',
            accounts,
        },
        'ethereum-mainnet': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM_MAINNET || 'https://eth.llamarpc.com',
            accounts,
        },
        'ethereum-sepolia': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_ETHEREUM_SEPOLIA || 'https://eth-sepolia.api.onfinality.io/public',
            accounts,
        },
        'bsc-mainnet': {
            eid: EndpointId.BSC_V2_MAINNET,
            url: process.env.RPC_URL_BSC_MAINNET || 'https://bsc.llamarpc.com',
            accounts,
        },
        'bsc-testnet': {
            eid: EndpointId.BSC_V2_TESTNET,
            url: process.env.RPC_URL_BSC_TESTNET || 'https://bnb-testnet.api.onfinality.io/public',
            accounts,
        },
        'bera-mainnet': {
            eid: EndpointId.BERA_V2_MAINNET,
            url: process.env.RPC_URL_BERA_MAINNET || 'https://rpc.berachain.com/',
            accounts,
        },
        'bera-testnet': {
            eid: EndpointId.BERA_V2_TESTNET,
            url: process.env.RPC_URL_BERA_TESTNET || 'https://bepolia.rpc.berachain.com/',
            accounts,
        },
        'optimism-mainnet': {
            eid: EndpointId.OPTIMISM_V2_MAINNET,
            url: process.env.RPC_URL_OPTIMISM_MAINNET || 'https://opt.llamarpc.com',
            accounts,
        },
        'optimism-testnet': {
            eid: EndpointId.OPTSEP_V2_TESTNET,
            url: process.env.RPC_URL_OP_SEPOLIA || 'https://optimism-sepolia.api.onfinality.io/public',
            accounts,
        },
        'polygon-mainnet': {
            eid: EndpointId.POLYGON_V2_MAINNET,
            url: process.env.RPC_URL_POLYGON_MAINNET || 'https://polygon.llamarpc.com',
            accounts,
        },
        'polygon-testnet': {
            eid: EndpointId.POLYGON_V2_TESTNET,
            url: process.env.RPC_URL_POLYGON_TESTNET || 'https://polygon-amoy.api.onfinality.io/public',
            accounts,
        },
        'gnosis-mainnet': {
            eid: EndpointId.GNOSIS_V2_MAINNET,
            url: process.env.RPC_URL_GNOSIS_MAINNET || 'https://rpc.gnosischain.com',
            accounts,
        },
        'gnosis-testnet': {
            eid: EndpointId.GNOSIS_V2_TESTNET,
            url: process.env.RPC_URL_GNOSIS_TESTNET || 'https://gnosis-chiado-rpc.publicnode.com',
            accounts,
        },

        'tron-mainnet': {
            eid: EndpointId.TRON_V2_MAINNET,
            url: process.env.RPC_URL_TRON_MAINNET || 'https://rpc.tron.network',
            accounts,
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
