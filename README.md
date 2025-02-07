# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# Subtensor EVM Erc20 token example

Example project that shows creation of ERC-20 token on Subtensor EVM. Uses Hardhat and OpenZepplin.

This example project shows the following concepts:

- Hardhat setup (see file hardhat.config.ts)
- Contract deployment to local network and/or testnet
- Reading balance and a few parameters of deployed ERC-20 token

## Running on Testnet

```bash
yarn install
yarn run build
yarn run deploy-testnet
yarn run balance-testnet
```

## Running Locally

Note: Requires a local network running, see the [EVM Demo repository](https://github.com/gztensor/evm-demo) for more instructions.

```bash
yarn install
yarn run build
yarn run deploy-local
yarn run balance-local
```