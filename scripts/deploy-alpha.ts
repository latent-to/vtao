import { ethers, upgrades } from "hardhat";
import fs from "fs";

const NETUID = 1; // Testing

async function main() {

  const wstAlpha = await ethers.getContractFactory("AlphaERC20"); // Has access to private fields
  const [owner, otherAccount, thirdAccount] = await ethers.getSigners();
  const wstAlphaContract = await upgrades.deployProxy(wstAlpha, [owner.address, `Subnet ${NETUID} Alpha`, `Alpha${NETUID}`, NETUID], { initializer: 'initialize' });
  await wstAlphaContract.waitForDeployment();

  console.log(
    `wstAlpha deployed to ${wstAlphaContract.target}`
  );

  // Save deployment address and ABI
  const deployedContract = {
    address: wstAlphaContract.target,
    abi: JSON.parse(wstAlphaContract.interface.formatJson())
  };
  fs.writeFileSync("./deployed-contract-alpha.json", JSON.stringify(deployedContract));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
