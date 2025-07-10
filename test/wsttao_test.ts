import { expect } from "chai";

import { ethers, upgrades } from "hardhat";

const DECIMALS = 18;
let contract_address: string | null = null;

describe("wstTAO", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  before(async function () {
    console.log("before");
    const { wstTAOContract } = await deployToken();
    contract_address = await wstTAOContract.getAddress();
    console.log("contract_address", contract_address);
    expect(contract_address).to.not.equal(
      ethers.ZeroAddress
    ).and.to.not.be.undefined;

    // Send 500 RAO to the contract
    const [owner] = await ethers.getSigners();
    const raoAsBigInt = ethers.parseUnits("500", 9);
    const tx = await owner.sendTransaction({
      to: contract_address,
      value: raoAsBigInt,
    });
    await tx.wait();
    console.log("500 RAO sent to the contract");

    return { contract_address };
  });

  async function deployToken() {
    const wstTAO = await ethers.getContractFactory("WrappedStakedTAO"); // Has access to private fields
    const [owner, otherAccount] = await ethers.getSigners();
    console.log("owner", owner.address);
    console.log("otherAccount", otherAccount.address);
    console.log("deploying wstTAO");
    const wstTAOContract = await upgrades.deployProxy(wstTAO, [owner.address], {
      initializer: "initialize",
    });
    await wstTAOContract.waitForDeployment();
    console.log("wstTAOContract deployed");

    return { wstTAOContract: wstTAOContract as any, owner, otherAccount };
  }

  async function checkDeployment() {
    const [owner, otherAccount] = await ethers.getSigners();
    console.log("owner", owner.address);
    console.log("otherAccount", otherAccount.address);

    if (contract_address == null) {
      throw new Error("contract_address is null");
    }
    const wstTAOContract = await ethers.getContractAt(
      "WrappedStakedTAO",
      contract_address as string
    );
    await wstTAOContract.waitForDeployment();

    return { wstTAOContract: wstTAOContract as any, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy contract with correct decimals", async function () {
      const { wstTAOContract } = await checkDeployment();
      expect(await wstTAOContract.decimals()).to.equal(DECIMALS);
    });

    it("Should deploy contract with correct symbol", async function () {
      const { wstTAOContract } = await checkDeployment();
      const symbol = await wstTAOContract.symbol();
      console.log("symbol", symbol);
      expect(symbol).to.equal("wstTAO");
    });

    it("Should deploy contract with correct name", async function () {
      const { wstTAOContract } = await checkDeployment();
      const name = await wstTAOContract.name();
      console.log("name", name);
      expect(name).to.equal("Wrapped Staked TAO");
    });

    it("Should deploy contract with correct initial supply", async function () {
      const { wstTAOContract } = await checkDeployment();
      const totalSupply = await wstTAOContract.totalSupply();
      console.log("totalSupply", totalSupply);
      expect(totalSupply).to.equal(0);
    });
  });

  describe("Staking", function () {
    describe("Happy paths", function () {
      it("Should stake close to the amount staked", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        const ca = await wstTAOContract.getAddress();

        const toStake = 0.5;
        const toStakeAsBigInt = ethers.parseUnits(
          toStake.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeRaoDecimals = ethers.parseUnits(toStake.toFixed(9), 9);

        const reqBalance = ethers.parseUnits(
          (toStake + 0.05).toFixed(DECIMALS),
          DECIMALS
        );
        console.log("reqBalance", reqBalance);

        const balance = await ethers.provider.getBalance(otherAccount.address);
        console.log("balance", balance);
        expect(balance).to.be.greaterThanOrEqual(reqBalance);

        // Run the stake transaction
        const tx = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeAsBigInt });

        await tx.wait();

        const balanceOfOtherAccount = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("wstTAO balanceOfOtherAccount", balanceOfOtherAccount);

        // Expect the wstTAO balance of otherAccount to be close to the amount staked
        expect(balanceOfOtherAccount).to.be.closeTo(
          toStakeAsBigInt,
          toStakeAsBigInt / 1000000n
        );

        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(ca)).to.be.closeTo(
          0,
          toStakeAsBigInt / 1000000n
        );

        // Expect the TAO balance of the contract to be 0
        const balanceOfContract = await ethers.provider.getBalance(ca);
        console.log("TAO balanceOfContract", balanceOfContract);
        expect(balanceOfContract).to.be.closeTo(0, toStakeAsBigInt / 1000000n);

        // Check stake balance of contract
        const stakeBalance = await wstTAOContract.getCurrentStake(0);
        console.log("stakeBalance", stakeBalance);
        expect(stakeBalance).to.be.closeTo(
          toStakeRaoDecimals,
          toStakeRaoDecimals / 1000n
        );
      });

      it("Should unstake close to the amount staked", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        const ca = await wstTAOContract.getAddress();

        const currentBalance = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("currentBalance", currentBalance);

        const toStake = 0.5;
        const toStakeAsBigInt = ethers.parseUnits(
          toStake.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeRaoDecimals = ethers.parseUnits(toStake.toFixed(9), 9);

        const reqBalance = ethers.parseUnits(
          (toStake + 0.05).toFixed(DECIMALS),
          DECIMALS
        );
        console.log("reqBalance", reqBalance);

        const balance = await ethers.provider.getBalance(otherAccount.address);
        console.log("balance", balance);
        expect(balance).to.be.greaterThanOrEqual(reqBalance);

        const stakeBalanceBefore = await wstTAOContract.getCurrentStake(0);
        console.log("stakeBalanceBefore", stakeBalanceBefore);

        // Run the stake transaction
        const tx = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeAsBigInt });

        await tx.wait();

        // check balance of otherAccount
        const newBalance = await wstTAOContract.balanceOf(otherAccount.address);
        console.log("newBalance", newBalance);
        expect(newBalance - currentBalance).to.be.closeTo(
          toStakeAsBigInt,
          toStakeAsBigInt / 1000000n
        );

        // Check stake balance of contract after unstaking
        const stakeBalanceAfter = await wstTAOContract.getCurrentStake(0);
        console.log("stakeBalanceAfter", stakeBalanceAfter);
        expect(stakeBalanceAfter).to.be.closeTo(
          stakeBalanceBefore + toStakeRaoDecimals,
          (stakeBalanceBefore + toStakeRaoDecimals) / 1000n
        );

        // ===== Unstake it =====
        const unstakeTx = await wstTAOContract
          .connect(otherAccount)
          .unstake(otherAccount.address, { value: toStakeAsBigInt - 1n });
        await unstakeTx.wait();

        // check balance of otherAccount after unstaking
        const newBalance2 = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("newBalance2", newBalance2);
        expect(newBalance2).to.be.closeTo(0, currentBalance / 1000000n);

        // Check stake balance of contract after unstaking
        const stakeBalanceAfter2 = await wstTAOContract.getCurrentStake(0);
        console.log("stakeBalanceAfter2", stakeBalanceAfter2);
        expect(stakeBalanceAfter2).to.be.closeTo(
          stakeBalanceBefore,
          stakeBalanceBefore / 1000n
        );
      });
    });
  });
});
