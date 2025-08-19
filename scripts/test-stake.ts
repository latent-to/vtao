import { ethers } from "hardhat";
import fs from "fs";
import { config } from '../config';
import { IStakingV2ABI, ISTAKING_V2_ADDRESS } from "./interfaces/staking";

const DECIMALS = 18;

const NETUID = 1;

async function main() {
  // Get deployed address
  const address = ISTAKING_V2_ADDRESS;
  const abi = IStakingV2ABI;

  const signer = await ethers.provider.getSigner()

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, signer);

  // Get the owner's address balance
  const wallet = new ethers.Wallet(config.ethPrivateKey);

  const toStake = 0.1 * 10 ** 9;
  const toStakeAsBigInt = ethers.parseUnits(toStake.toFixed(DECIMALS), DECIMALS);
  const hotkey = "0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954";
  // 0x51A804Ae94029e3401D3985Bd63606c7bC05DeAA --> H160 as pubkey
  const coldkey = "0x2a41b3d9ccc7fbbda5453b601d22fff585714003f271885f3ab79e62c95172ff"; 

  const options = {value: 0}
  const tx = await contract.addStake(hotkey, toStake, NETUID);
  await tx.wait();

  const curr_stake = await contract.getStake(hotkey, coldkey, NETUID);
  console.log("curr_stake", curr_stake);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
