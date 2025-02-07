import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const token = await ethers.deployContract("SomeToken", []);
  await token.waitForDeployment();

  console.log(
    `SomeToken deployed to ${token.target}`
  );

  // Save deployment address and ABI
  const deployedContract = {
    address: token.target,
    abi: JSON.parse(token.interface.formatJson())
  };
  fs.writeFileSync("./deployed-contract.json", JSON.stringify(deployedContract));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
