# wstTAO
A wrapped-staked ERC-20 compatible version of TAO.

## Running tests

1. Add two EVM private keys to `config.ts`
2. Send some testTAO to both keys on the EVM (~50 testTAO).  

    a. You can either use https://snow-address-converter.netlify.app/ to convert H160 -> SS58 and transfer from a standard Bittensor address (on testnet).  
    b. Or, you can send some EVM testTAO directly to each address.

3. Run the tests 

Deploy a contract to testnet and run tests on it:
```bash
yarn install
yarn run test
```
