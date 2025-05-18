import { ethers, upgrades } from "hardhat";
import fs from "fs";

async function main() {

  const wstTAO = await ethers.getContractFactory("WrappedStakedTAO"); // Has access to private fields
  const [owner, otherAccount, thirdAccount] = await ethers.getSigners();
  const wstTAOContract = await upgrades.deployProxy(wstTAO, [owner.address], { initializer: 'initialize' });
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
