import "@nomicfoundation/hardhat-foundry";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { config } from './config';

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "subevm",
  networks: {
    testnet: {
      url: "https://test.chain.opentensor.ai",
      accounts: [config.ethPrivateKey, config.ethPrivateKey1]
    },
    subevm: {
      url: "https://lite.chain.opentensor.ai",
      accounts: [config.ethPrivateKey]
    },
    localnet: {
      url: "http://127.0.0.1:9945",
      accounts: [config.ethPrivateKey, config.ethPrivateKey1]
    },
    taostats: {
      url: 'https://evm.taostats.io/api/eth-rpc'
    },
    'subtensor-evm': {
      url: 'https://evm.tao.app/api/eth-rpc'
    }
  },
  etherscan: {
    apiKey: {
      'taostats': 'empty',
      'subtensor-evm': 'empty'
    },
    customChains: [
      {
        network: "taostats",
        chainId: 964,
        urls: {
          apiURL: "https://evm.taostats.io/api",
          browserURL: "https://evm.taostats.io"
        },
      },
      {
          network: "subtensor-evm",
          chainId: 964,
          urls: {
            apiURL: "https://evm.tao.app/api",
            browserURL: "https://evm.tao.app"
          }
      }
    ]
  },
  mocha: {
    timeout: 300000
  },
};

export default hardhatConfig;
