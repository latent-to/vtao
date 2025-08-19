import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {

  let deployedInfo;
  try {
    deployedInfo = fs.readFileSync("./deployed-contract.json").toString();
  } catch (e) {
    console.log("ERROR: Can't read the deployed contract info. The contrac needs to be deployed first.");
    return;
  }
  const { address, abi } = JSON.parse(deployedInfo);
  console.log(`vTAO address: ${address}`);

  const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, owner);


  const vTAO = await ethers.getContractFactory("VirtualTAO"); // Has access to private fields
  
  const vTAOContract = await upgrades.upgradeProxy(contract, vTAO);
  await vTAOContract.waitForDeployment();

  console.log(
    `vTAO deployed to ${vTAOContract.target}`
  );

  // Save deployment address and ABI
  const deployedContract = {
    address: vTAOContract.target,
    abi: JSON.parse(vTAOContract.interface.formatJson())
  };
  fs.writeFileSync("./deployed-contract.json", JSON.stringify(deployedContract));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
