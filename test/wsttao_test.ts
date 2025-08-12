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

    // Send stake minimum to the contract
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

        // Check balance of contract at start of test
        const contract_balanceBefore = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", contract_balanceBefore);

        const toStake0 = 0.5;
        const toStake0AsBigInt = ethers.parseUnits(
          toStake0.toFixed(DECIMALS),
          DECIMALS
        );

        console.log(`staking ${toStake0} TAO`);
        // Run the stake transaction
        const tx0 = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStake0AsBigInt });

        await tx0.wait();

        console.log("stake done");

        const currentBalance: bigint = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", currentBalance);

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

        const balance = await ethers.provider.getBalance(otherAccount.address);
        console.log("user free balance:", balance);
        expect(balance).to.be.greaterThanOrEqual(reqBalance);

        const stakeBalanceBefore = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalanceBefore);

        console.log(`staking ${toStake} TAO again`);

        // Run the stake transaction again
        const tx1 = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeAsBigInt });

        await tx1.wait();

        // check balance of otherAccount
        const newBalance: bigint = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", newBalance);
        expect(newBalance - currentBalance).to.be.closeTo(
          toStakeAsBigInt,
          toStakeAsBigInt / 1000000n
        );

        // Check stake balance of contract after staking
        const stakeBalanceAfter = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalanceAfter);
        expect(stakeBalanceAfter).to.be.closeTo(
          stakeBalanceBefore + toStakeRaoDecimals,
          (stakeBalanceBefore + toStakeRaoDecimals) / 1000n
        );

        console.log(`unstaking ${newBalance - currentBalance} CA-balance`);
        const toUnstake: bigint = newBalance - currentBalance;
        // ===== Unstake it =====
        const unstakeTx = await wstTAOContract
          .connect(otherAccount)
          .unstake(toUnstake - 1n);
        await unstakeTx.wait();

        // check balance of otherAccount after unstaking
        const newBalance2 = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", newBalance2);
        expect(newBalance2).to.be.closeTo(
          currentBalance,
          currentBalance / 10_000n
        ); // within 0.0001%

        // Check balance of contract after unstaking
        const contract_balanceAfter = await ethers.provider.getBalance(ca);
        console.log("contract_balanceAfter", contract_balanceAfter);
        expect(contract_balanceAfter).to.be.closeTo(
          contract_balanceBefore, // Shouldn't change much
          contract_balanceBefore / 1000n
        );

        // Check stake balance of contract after unstaking
        const stakeBalanceAfter2 = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalanceAfter2);
        expect(stakeBalanceAfter2).to.be.closeTo(
          stakeBalanceBefore,
          stakeBalanceBefore / 1000n
        );
      });

      it("Should allow a larger stake after a small initial stake", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        const ca = await wstTAOContract.getAddress();

        // Check stake of contract at start of test
        const contract_stakeBefore = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", contract_stakeBefore);

        // Check contract balance at start of test
        const contract_balanceBefore = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", contract_balanceBefore);

        // Check user balance at start of test
        const user_balanceBefore = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", user_balanceBefore);

        const toStakeInitial = 0.25;
        const toStakeInitialAsBigInt = ethers.parseUnits(
          toStakeInitial.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeRaoDecimals = ethers.parseUnits(
          toStakeInitial.toFixed(9),
          9
        );

        const reqBalance = ethers.parseUnits(
          (toStakeInitial + 0.05).toFixed(DECIMALS),
          DECIMALS
        );

        const balance = await ethers.provider.getBalance(otherAccount.address);
        console.log("user free balance:", balance);
        expect(balance).to.be.greaterThanOrEqual(reqBalance);

        // Run the stake transaction
        const tx = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeInitialAsBigInt });

        await tx.wait();

        const balanceOfOtherAccount = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", balanceOfOtherAccount);

        // Expect the increase in wstTAO balance of otherAccount to be close to the amount staked
        expect(balanceOfOtherAccount).to.be.closeTo(
          toStakeInitialAsBigInt + user_balanceBefore,
          toStakeInitialAsBigInt / 1000000n
        );

        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(ca)).to.be.closeTo(
          0,
          toStakeInitialAsBigInt / 1000000n
        );

        // Expect the TAO balance of the contract to be unchanged
        const balanceOfContract = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", balanceOfContract);
        expect(balanceOfContract).to.be.closeTo(
          contract_balanceBefore,
          toStakeInitialAsBigInt / 1000000n
        );

        // Check stake balance of contract
        const stakeBalance = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalance);
        expect(stakeBalance).to.be.closeTo(
          contract_stakeBefore + toStakeRaoDecimals,
          toStakeRaoDecimals / 1000n
        );

        // Stake a larger amount
        const toStakeBig = 10.0;
        const toStakeBigAsBigInt = ethers.parseUnits(
          toStakeBig.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeBigRaoDecimals = ethers.parseUnits(
          toStakeBig.toFixed(9),
          9
        );

        // Run the stake transaction
        const tx2 = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeBigAsBigInt });

        await tx2.wait();

        // Check the stake of the contract
        const stakeBalanceAfter2 = await wstTAOContract.getCurrentStake(0);
        console.log("stakeBalanceAfter2", stakeBalanceAfter2);
        expect(stakeBalanceAfter2).to.be.closeTo(
          stakeBalance + toStakeBigRaoDecimals,
          stakeBalanceAfter2 / 1000n
        );

        // Check the balance of the staker
        const balanceOfOtherAccount2 = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", balanceOfOtherAccount2);
        expect(balanceOfOtherAccount2).to.be.closeTo(
          toStakeBigAsBigInt + toStakeInitialAsBigInt + user_balanceBefore,
          (toStakeBigAsBigInt + toStakeInitialAsBigInt + user_balanceBefore) /
            1000000n
        );
      });

      it("Should allow a smaller stake after a large initial stake", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        const ca = await wstTAOContract.getAddress();

        // Check stake of contract at start of test
        const contract_stakeBefore = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", contract_stakeBefore);

        // Check contract balance at start of test
        const contract_balanceBefore = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", contract_balanceBefore);

        // Check user balance at start of test
        const user_balanceBefore = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", user_balanceBefore);

        const toStakeInitial = 10.0;
        const toStakeInitialAsBigInt = ethers.parseUnits(
          toStakeInitial.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeRaoDecimals = ethers.parseUnits(
          toStakeInitial.toFixed(9),
          9
        );

        const reqBalance = ethers.parseUnits(
          (toStakeInitial + 0.05).toFixed(DECIMALS),
          DECIMALS
        );

        const balance = await ethers.provider.getBalance(otherAccount.address);
        console.log("user free balance:", balance);
        expect(balance).to.be.greaterThanOrEqual(reqBalance);

        // Run the stake transaction
        const tx = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeInitialAsBigInt });

        await tx.wait();

        const balanceOfOtherAccount = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", balanceOfOtherAccount);

        // Expect the wstTAO balance of otherAccount to be close to the amount staked
        expect(balanceOfOtherAccount).to.be.closeTo(
          toStakeInitialAsBigInt + user_balanceBefore,
          toStakeInitialAsBigInt / 1000000n
        );

        // Expect the wstTAO balance of the contract to be 0
        expect(await wstTAOContract.balanceOf(ca)).to.be.closeTo(
          0,
          toStakeInitialAsBigInt / 1000000n
        );

        // Expect the TAO balance of the contract to be 0
        const balanceOfContract = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", balanceOfContract);
        expect(balanceOfContract).to.be.closeTo(
          contract_balanceBefore,
          toStakeInitialAsBigInt / 1000000n
        );

        // Check stake balance of contract
        const stakeBalance = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalance);
        expect(stakeBalance).to.be.closeTo(
          contract_stakeBefore + toStakeRaoDecimals,
          toStakeRaoDecimals / 1000n
        );

        // Stake a smaller amount
        const toStakeSmall = 0.25;
        const toStakeSmallAsBigInt = ethers.parseUnits(
          toStakeSmall.toFixed(DECIMALS),
          DECIMALS
        );

        const toStakeSmallRaoDecimals = ethers.parseUnits(
          toStakeSmall.toFixed(9),
          9
        );

        // Run the stake transaction
        const tx2 = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, { value: toStakeSmallAsBigInt });

        await tx2.wait();

        // Check the stake of the contract
        const stakeBalanceAfter2 = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", stakeBalanceAfter2);
        expect(stakeBalanceAfter2).to.be.closeTo(
          stakeBalance + toStakeSmallRaoDecimals,
          stakeBalanceAfter2 / 1000n
        );

        // Check the balance of the staker
        const balanceOfOtherAccount2 = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", balanceOfOtherAccount2);
        expect(balanceOfOtherAccount2).to.be.closeTo(
          toStakeSmallAsBigInt + toStakeInitialAsBigInt + user_balanceBefore,
          (toStakeSmallAsBigInt + toStakeInitialAsBigInt + user_balanceBefore) /
            1000000n
        );
      });
    });

    describe("Unhappy paths", function () {
      it("Should not allow a stake of 0", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        // Stake the inital minimum balance
        const toStakeInitial = 0.25;
        const toStakeInitialAsBigInt = ethers.parseUnits(
          toStakeInitial.toFixed(DECIMALS),
          DECIMALS
        );

        const tx1 = await wstTAOContract.stake(otherAccount.address, {
          value: toStakeInitialAsBigInt,
        });
        await tx1.wait();

        // Try to stake 0
        const toStake = 0.0;
        const toStakeAsBigInt = ethers.parseUnits(
          toStake.toFixed(DECIMALS),
          DECIMALS
        );

        const tx = wstTAOContract.stake(otherAccount.address, {
          value: toStakeAsBigInt,
        });
        await expect(tx).to.be.revertedWith(/can't stake zero/);
      });

      it("Should not allow a stake of below the minimum stake", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        // Stake the inital minimum balance
        const toStakeInitial = 0.25;
        const toStakeInitialAsBigInt = ethers.parseUnits(
          toStakeInitial.toFixed(DECIMALS),
          DECIMALS
        );

        const tx1 = await wstTAOContract.stake(otherAccount.address, {
          value: toStakeInitialAsBigInt,
        });
        await tx1.wait();

        // Try to stake below the minimum stake amount

        const toStake = 0.0001; // Less than 0.0002 minimum stake amount
        const toStakeAsBigInt = ethers.parseUnits(
          toStake.toFixed(DECIMALS),
          DECIMALS
        );

        const tx = wstTAOContract.stake(otherAccount.address, {
          value: toStakeAsBigInt,
        });
        await expect(tx).to.be.revertedWith(
          /can't stake less than the min amount/
        );
      });

      it("Should not allow a user to unstake more than their balance", async function () {
        const { wstTAOContract, otherAccount } = await checkDeployment();
        const ca = await wstTAOContract.getAddress();

        // Check stake of contract at start of test
        const contract_stakeBefore = await wstTAOContract.getCurrentStake(0);
        console.log("contract stake:", contract_stakeBefore);

        // Check user balance at start of test
        const user_balanceBefore = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", user_balanceBefore);

        // Check contract balance at start of test
        const contract_balanceBefore = await ethers.provider.getBalance(ca);
        console.log("contract free balance:", contract_balanceBefore);

        // Stake some TAO
        const toStake = 0.5;
        const toStakeAsBigInt = ethers.parseUnits(
          toStake.toFixed(DECIMALS),
          DECIMALS
        );

        const tx0 = await wstTAOContract
          .connect(otherAccount)
          .stake(otherAccount.address, {
            value: toStakeAsBigInt,
          });
        await tx0.wait();

        // Get the user's balance after staking
        const user_balanceAfter = await wstTAOContract.balanceOf(
          otherAccount.address
        );
        console.log("user CA-balance:", user_balanceAfter);

        // Try to unstake more than the user's balance
        const toUnstake = user_balanceAfter;
        const tx = wstTAOContract.connect(otherAccount).unstake(toUnstake + 1n);
        await expect(tx).to.be.revertedWith(
          /can't unstake more .+? than user has/
        );
      });
    });
  });
});
