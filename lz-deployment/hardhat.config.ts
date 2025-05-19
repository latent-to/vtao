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

// taks imports
import './tasks/testBridgeToken'

import './type-extensions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

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
        'base-sepolia-testnet': {
            eid: EndpointId.BASESEP_V2_TESTNET,
            url: process.env.RPC_URL_BASE_SEPOLIA || 'https://base-sepolia-rpc.publicnode.com',
            accounts,
        },
        'base-mainnet': {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE_MAINNET || 'https://base-public.nodies.app', //'https://base.llamarpc.com',
            accounts,
        },
        'subevm-testnet': {
            eid: EndpointId.SUBTENSOREVM_V2_TESTNET,
            url: process.env.RPC_URL_SUBEVM,
            accounts,
            oftAdapter: {
                tokenAddress: '0x99A46BB01D13C3A63983A59f539335131eB3fc71', // Set the token address for the OFT adapter
            },
        },
        'subevm-mainnet': {
            eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
            url: process.env.RPC_URL_SUBEVM_MAINNET,
            accounts,
            oftAdapter: {
                tokenAddress: '0xe7E937f9BD1ec3F6771e8FaA3584b5409C0C1D30', // Set the token address for the OFT adapter
            },
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
