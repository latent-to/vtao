import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import { config } from './config';

const hardhatConfig: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "subevm",
  networks: {
    testnet: {
      url: "https://test.chain.opentensor.ai",
      accounts: [config.ethPrivateKey]
    },
    subevm: {
      url: "https://lite.chain.opentensor.ai",
      accounts: [config.ethPrivateKey]
    }
  },
  mocha: {
    timeout: 300000
  },
};

export default hardhatConfig;
