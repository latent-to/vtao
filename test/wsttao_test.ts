import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, network } from "hardhat";

const DECIMALS = 18;

describe("wstTAO", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployToken() {
    const wstTAO = await ethers.getContractFactory("TestWstTAO"); // Has access to private fields
    const wstTAOContract = await wstTAO.deploy();
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();

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
      it("Should queue stake if unstake queue is empty", async function () {
        const { wstTAOContract, otherAccount } = await loadFixture(deployToken);

        const toStake = 100;
        const toStakeAsHex = "0x" + (toStake * 10 ** DECIMALS).toString(16);
        const toStakeAsBigInt = ethers.parseUnits(toStake.toFixed(DECIMALS), DECIMALS);
        // set balance of otherAccount to 100 TAO
        await network.provider.send("hardhat_setBalance", [
          otherAccount.address,
          toStakeAsHex
        ]);

        // Run the stake transaction
        await wstTAOContract.connect(otherAccount).stake(otherAccount.address, { value: toStakeAsBigInt });
        
        // Expect the wstTAO balance is *not* changed; i.e. still 0
        expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(0);
        // Expect the contract balance to be 100
        expect(await ethers.provider.getBalance(wstTAOContract.address)).to.equal(toStakeAsBigInt);

        // Expect the stake queue to be updated
        const [stakeQueueKeys, stakeQueueValues] = await wstTAOContract.getStakeQueue();
        expect(stakeQueueKeys.length).to.equal(1);
        expect(stakeQueueKeys[0]).to.equal(otherAccount.address);
        expect(stakeQueueValues[0]).to.equal(toStakeAsBigInt);

        // Expect the stake queue total to be updated
        expect(await wstTAOContract.getStakeQueueTotal()).to.equal(toStakeAsBigInt);
      });
   
      it("Should queue unstake if stake queue is empty", async function () {
        const { wstTAOContract, otherAccount } = await loadFixture(deployToken);

        const toUnstake = 100;
        const toUnstakeAsBigInt = ethers.parseUnits(toUnstake.toFixed(DECIMALS), DECIMALS);

        // Set the token balance of otherAccount to 100 wstTAO
        await wstTAOContract.mint(otherAccount.address, toUnstakeAsBigInt);

        // Run the unstake transaction
        await wstTAOContract.connect(otherAccount).unstake(toUnstakeAsBigInt);
        
        // Expect the wstTAO balance of otherAccount to be 0
        expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(0);
        // Expect the contract balance to be 100
        expect(await wstTAOContract.balanceOf(wstTAOContract.address)).to.equal(toUnstakeAsBigInt);
        // Expect the TAO balance of otherAccount to NOT be changed
        expect(await ethers.provider.getBalance(otherAccount.address)).to.equal(0);

        // Expect the unstake queue to be updated
        const [unstakeQueueKeys, unstakeQueueValues] = await wstTAOContract.getUnstakeQueue();
        expect(unstakeQueueKeys.length).to.equal(1);
        expect(unstakeQueueKeys[0]).to.equal(otherAccount.address);
        expect(unstakeQueueValues[0]).to.equal(toUnstakeAsBigInt);

        // Expect the unstake queue total to be updated
        expect(await wstTAOContract.getUnstakeQueueTotal()).to.equal(toUnstakeAsBigInt);
      });

      it("Should unstake from the stake queue if the user's stake queue is not empty", async function () {
        const { wstTAOContract, otherAccount } = await loadFixture(deployToken);

        const toUnstake = 100;
        const toUnstakeAsBigInt = ethers.parseUnits(toUnstake.toFixed(DECIMALS), DECIMALS);
        const toUnstakeAsHex = "0x" + (toUnstake * 10 ** DECIMALS).toString(16);

        // Set the token balance of otherAccount to 100 wstTAO
        await wstTAOContract.mint(otherAccount.address, toUnstakeAsBigInt);
        // Give the contract the TAO balance
        await ethers.provider.send("hardhat_setBalance", [
          wstTAOContract.address,
          toUnstakeAsHex
        ]);

        // Add the user's address to the stake queue
        await wstTAOContract.setStakeQueue([otherAccount.address], [toUnstakeAsBigInt]);
        await wstTAOContract.setStakeQueueTotal(toUnstakeAsBigInt);

        // Run the unstake transaction
        await wstTAOContract.connect(otherAccount).unstake(toUnstakeAsBigInt);
        
        // Expect the wstTAO balance of otherAccount to be 100
        expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(toUnstakeAsBigInt);
        // Expect the TAO balance of otherAccount to be 100
        expect(await ethers.provider.getBalance(otherAccount.address)).to.equal(toUnstakeAsBigInt);
        // Expect the TAO balance of the contract to be 0
        expect(await ethers.provider.getBalance(wstTAOContract.address)).to.equal(0);
        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(wstTAOContract.address)).to.equal(0);

        // Expect the stake queue to be empty
        const [stakeQueueKeys, stakeQueueValues] = await wstTAOContract.getStakeQueue();
        expect(stakeQueueKeys.length).to.equal(0);
        expect(stakeQueueValues.length).to.equal(0);

        // Expect the stake queue total to be 0
        expect(await wstTAOContract.getStakeQueueTotal()).to.equal(0);

        // Expect the unstake queue to be remain empty (should not have added to it)
        const [unstakeQueueKeys, unstakeQueueValues] = await wstTAOContract.getUnstakeQueue();
        expect(unstakeQueueKeys.length).to.equal(0);
        expect(unstakeQueueValues.length).to.equal(0);

        // Expect the unstake queue total to be 0
        expect(await wstTAOContract.getUnstakeQueueTotal()).to.equal(0);
      });

      it("Should stake from the unstake queue if the user's unstake queue is not empty", async function () {
        const { wstTAOContract, otherAccount } = await loadFixture(deployToken);
        
        const toStake = 100;
        const toStakeAsBigInt = ethers.parseUnits(toStake.toFixed(DECIMALS), DECIMALS);
        const toStakeAsHex = "0x" + (toStake * 10 ** DECIMALS).toString(16);

        // Set the token balance of otherAccount to 100 TAO
        await ethers.provider.send("hardhat_setBalance", [
          otherAccount.address,
          toStakeAsHex
        ]);
        // Give the contract the wstTAO balance
        await wstTAOContract.mint(wstTAOContract.address, toStakeAsBigInt);
        
        // Add the user's address to the unstake queue
        await wstTAOContract.setUnstakeQueue([otherAccount.address], [toStakeAsBigInt]);
        await wstTAOContract.setUnstakeQueueTotal(toStakeAsBigInt);

        // Run the stake transaction
        await wstTAOContract.connect(otherAccount).stake(otherAccount.address, { value: toStakeAsBigInt });
        
        // Expect the wstTAO balance of otherAccount to be 100
        expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(toStakeAsBigInt);
        // Expect the TAO balance of otherAccount to be 100
        expect(await ethers.provider.getBalance(otherAccount.address)).to.equal(toStakeAsBigInt);
        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(wstTAOContract.address)).to.equal(0);
        // Expect the TAO balance of the contract to be 0
        expect(await ethers.provider.getBalance(wstTAOContract.address)).to.equal(0);

        // Expect the stake queue to be empty
        const [stakeQueueKeys, stakeQueueValues] = await wstTAOContract.getStakeQueue();
        expect(stakeQueueKeys.length).to.equal(0);
        expect(stakeQueueValues.length).to.equal(0);

        // Expect the stake queue total to be 0
        expect(await wstTAOContract.getStakeQueueTotal()).to.equal(0);

        // Expect the unstake queue to be remain empty (should not have added to it)
        const [unstakeQueueKeys, unstakeQueueValues] = await wstTAOContract.getUnstakeQueue();
        expect(unstakeQueueKeys.length).to.equal(0);
        expect(unstakeQueueValues.length).to.equal(0);

        // Expect the unstake queue total to be 0
        expect(await wstTAOContract.getUnstakeQueueTotal()).to.equal(0);
      });
    });

  });

  describe("Fast staking", function () {
    it("Should unstake from the stake queue if the stake queue is not empty", async function () {
      const { wstTAOContract, otherAccount, thirdAccount } = await loadFixture(deployToken);

      const toUnstake = 100;
      const toUnstakeAsBigInt = ethers.parseUnits(toUnstake.toFixed(DECIMALS), DECIMALS);

      // Set the token balance of otherAccount to 100 wstTAO
      await wstTAOContract.mint(otherAccount.address, toUnstakeAsBigInt);
      
      // Add another account to the stake queue
      await wstTAOContract.setStakeQueue([thirdAccount.address], [toUnstakeAsBigInt]);
      await wstTAOContract.setStakeQueueTotal(toUnstakeAsBigInt);

      // Run the fast unstake transaction
      await wstTAOContract.connect(otherAccount).fastUnstake(toUnstakeAsBigInt);
      
      // Expect the wstTAO balance of otherAccount to be 0
      expect(await wstTAOContract.balanceOf(otherAccount.address)).to.equal(0);
      // Expect the wstTAO balance of thirdAccount to be 100
      expect(await wstTAOContract.balanceOf(thirdAccount.address)).to.equal(toUnstakeAsBigInt);

      // Expect the stake queue to be empty
      const [stakeQueueKeys, stakeQueueValues] = await wstTAOContract.getStakeQueue();
      expect(stakeQueueKeys.length).to.equal(0);
      expect(stakeQueueValues.length).to.equal(0);

      // Expect the stake queue total to be 0
      expect(await wstTAOContract.getStakeQueueTotal()).to.equal(0);

      // Expect the unstake queue to be remain empty (should not have added to it)
      const [unstakeQueueKeys, unstakeQueueValues] = await wstTAOContract.getUnstakeQueue();
      expect(unstakeQueueKeys.length).to.equal(0);
      expect(unstakeQueueValues.length).to.equal(0);

      // Expect the unstake queue total to be 0
      expect(await wstTAOContract.getUnstakeQueueTotal()).to.equal(0);
    });
  });

});
