import { ethers } from "hardhat";
import fs from "fs";
import { config } from '../config';

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

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, ethers.provider);

  // Get token name
  const name = await contract.name();
  console.log("Contract name:", name);

  // Get token symbol
  const symbol = await contract.symbol();
  console.log("Token symbol:", symbol);

  // Get the owner's address balance
  const wallet = new ethers.Wallet(config.ethPrivateKey);
  const balance = await contract.balanceOf(wallet.address);
  console.log("Balance:", balance);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
