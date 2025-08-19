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

### Note about Localnet

If you're testing on a localnet, which you can run with the opentensor/subtensor repo via `./scripts/localnet.sh`, you may want to fund your balances by editing the `node/src/chain_spec/localnet.rs` file and adding your EVM ss58 equivalents to the `balances` vector: 

```rust
let mut balances = vec![
    // ...
    (
        AccountId::from_ss58_string("5H...").unwrap(),
        123_456_789u128 // funds
    ),
];
```
and then run the localnet script again to recompile.

You'll also want to disable the evm whitelist:  
  
Using polkadot-js/apps connected to your localnet (default: `http://127.0.0.1:9945`), navigate to the "Developer" -> "Extrinsics" tab and submit the following extrinsic as `Alice`:

```
sudo.sudo(
    evm.disableWhitelist(
        Yes
    )
)
```

This will allow you to deploy your contract to localnet as any account with balance.  

You will also want to enable the root subnet:  

```
sudo.sudo(
    adminUtils.sudoSetSubtokenEnabled(
        0,
        Yes
    )
)
```
  
This allows staking to the root subnet.

