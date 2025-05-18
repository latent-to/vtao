import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";

import { ethers, network, upgrades } from "hardhat";

const DECIMALS = 18;

describe("wstTAO", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployToken() {
    const wstTAO = await ethers.getContractFactory("WrappedStakedTAO"); // Has access to private fields
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();
    const wstTAOContract = await upgrades.deployProxy(wstTAO, [owner.address], { initializer: 'initialize' });

    return { wstTAOContract: wstTAOContract as any, owner, otherAccount, thirdAccount };
  }

  describe("Deployment", function () {
    it("Should deploy contract with correct decimals", async function () {
      const { wstTAOContract } = await loadFixture(deployToken);
      expect(await wstTAOContract.decimals()).to.equal(DECIMALS);
    });

    it("Should deploy contract with correct symbol", async function () {
      const { wstTAOContract } = await loadFixture(deployToken);
      expect(await wstTAOContract.symbol()).to.equal("wstTAO");
    });

    it("Should deploy contract with correct name", async function () {
      const { wstTAOContract } = await loadFixture(deployToken);
      expect(await wstTAOContract.name()).to.equal("Wrapped Staked TAO");
    });

    it("Should deploy contract with correct initial supply", async function () {
      const { wstTAOContract } = await loadFixture(deployToken);
      expect(await wstTAOContract.totalSupply()).to.equal(0);
    });
  });


  describe("Staking", function () {
    describe("Happy paths", function () {
      it("Should stake close to the amount staked", async function () {
        const { wstTAOContract, otherAccount } = await loadFixture(deployToken);
        
        const toStake = 100;
        const toStakeAsBigInt = ethers.parseUnits(toStake.toFixed(DECIMALS), DECIMALS);

        const toSetBalance = toStake + 1;
        const toSetBalanceAsHex = "0x" + (toSetBalance * 10 ** DECIMALS).toString(16);

        // Set the token balance of otherAccount to 100 TAO
        await ethers.provider.send("hardhat_setBalance", [
          otherAccount.address,
          toSetBalanceAsHex
        ]);

        // Run the stake transaction
        await wstTAOContract.connect(otherAccount).stake(otherAccount.address, { value: toStakeAsBigInt });
        
        // Expect the wstTAO balance of otherAccount to be close to the amount staked
        expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(toStakeAsBigInt);
       
        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(wstTAOContract.address)).to.equal(0);
        // Expect the TAO balance of the contract to be 0
        expect(await ethers.provider.getBalance(wstTAOContract.address)).to.equal(0);
      });
    });

  });

});
