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
  console.log(`wstTAO address: ${address}`);

  const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

  // Connect to the deployed ERC-20 contract
  const contract = new ethers.Contract(address, abi, owner);


  const wstTAO = await ethers.getContractFactory("WrappedStakedTAO"); // Has access to private fields
  
  const wstTAOContract = await upgrades.upgradeProxy(contract, wstTAO);
  await wstTAOContract.waitForDeployment();

  console.log(
    `wstTAO deployed to ${wstTAOContract.target}`
  );

  // Save deployment address and ABI
  const deployedContract = {
    address: wstTAOContract.target,
    abi: JSON.parse(wstTAOContract.interface.formatJson())
  };
  fs.writeFileSync("./deployed-contract.json", JSON.stringify(deployedContract));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
