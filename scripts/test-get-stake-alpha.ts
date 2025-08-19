import { ethers } from "hardhat";
import fs from "fs";
import { IStakingV2ABI, ISTAKING_V2_ADDRESS } from "./interfaces/staking";


async function main() {
  // Get deployed address
  let deployedInfo;
  try {
    deployedInfo = fs.readFileSync("./deployed-contract-alpha.json").toString();
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
  const wstAlphaContract = new ethers.Contract(c_address, c_abi, signer);

  const hotkey = "0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954";
  const coldkey = "0x5e02252a050b4dfcd82b02a2fbb149d91369f17a961622c83424cf822e9d67cf"; // c_address
  const netuid = 1;

  const curr_stake = await contract.getStake(hotkey, coldkey, netuid);
  console.log("curr_stake", curr_stake);

  const wstAlpha_stake = await wstAlphaContract.getCurrentStake(netuid);
  console.log("wstAlpha_stake", wstAlpha_stake);

  const pk = await wstAlphaContract.getAddressAsPk();
  console.log("pk", pk);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
