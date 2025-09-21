import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {

  const vTAO = await ethers.getContractFactory("VirtualTAO"); // Has access to private fields
  const [owner] = await ethers.getSigners();
  const vTAOContract = await upgrades.deployProxy(vTAO, [owner.address], { initializer: 'initialize' });
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
