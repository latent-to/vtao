import { ethers } from "hardhat";
import fs from "fs";
import { config } from '../config';

const DECIMALS = 18;

async function main() {
  // Get deployed address
  let deployedInfo;
  try {
    deployedInfo = fs.readFileSync("./deployed-contract.json").toString();
  } catch (e) {
    console.log("ERROR: Can't read the deployed contract info. The contrac needs to be deployed first.");
    return;
  }
  const { address, abi } = JSON.parse(deployedInfo);
  console.log(`SomeToken address: ${address}`);

  const signer = await ethers.provider.getSigner()

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, signer);

  // Get the owner's address balance
  const wallet = new ethers.Wallet(config.ethPrivateKey);

  // Check total supply
  const totalSupply = await contract.totalSupply();
  console.log("Total supply:", totalSupply);

  const toStake = 1.0;
  const toStakeAsBigInt = ethers.parseUnits(toStake.toFixed(DECIMALS), DECIMALS);

  const options = {value: toStakeAsBigInt}
  const tx = await contract.stake(wallet.address, options);
  await tx.wait();


  // Check total supply
  const totalSupplyAfterStake = await contract.totalSupply();
  console.log("Total supply after stake:", totalSupplyAfterStake);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
