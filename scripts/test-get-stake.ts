import { ethers } from "hardhat";
import fs from "fs";
import { IStakingV2ABI, ISTAKING_V2_ADDRESS } from "./interfaces/staking";


async function main() {
  // Get deployed address
  let deployedInfo;
  try {
    deployedInfo = fs.readFileSync("./deployed-contract.json").toString();
  } catch (e) {
    console.log("ERROR: Can't read the deployed contract info. The contrac needs to be deployed first.");
    return;
  }
  const { address: c_address, abi: c_abi } = JSON.parse(deployedInfo);

  // Get deployed address
  const address = ISTAKING_V2_ADDRESS;
  const abi = IStakingV2ABI;

  const signer = await ethers.provider.getSigner()

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, signer);
  const vTAOContract = new ethers.Contract(c_address, c_abi, signer);

  const hotkey = "0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954";
  const coldkey = "0xc3027b33125d032eb377cdbe408d35a8466d8510936824b40b7bf56bee26ba05"; // c_address
  const netuid = 0;

  const curr_stake = await contract.getStake(hotkey, coldkey, netuid);
  console.log("curr_stake", curr_stake);

  const vTAO_stake = await vTAOContract.getCurrentStake(netuid);
  console.log("vTAO_stake", vTAO_stake);

  const pk = await vTAOContract.getAddressAsPk();
  console.log("pk", pk);

  const vTAO_stake_pk = await vTAOContract.TAOtovTAO(100_000_000);
  console.log("vTAO_stake_pk", vTAO_stake_pk);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
