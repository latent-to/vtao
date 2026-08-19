// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {VirtualTAO} from "../contracts/vTAO.sol";

/// @notice UUPS upgrade of the vTAO proxy to the VirtualTAO implementation at git HEAD.
///
/// forge script script/03_UpgradeToRootClaim.s.sol:UpgradeToRootClaim \
///   --rpc-url subtensor-evm \
///   --ledger \
///   --broadcast -vvvv
contract UpgradeToRootClaim is Script {
    bytes32 private constant IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    function run() public {
        address[] memory wallets = vm.getWallets();
        require(wallets.length > 0, "No script wallets found");
        address executor = wallets[0];
        console.log("Executor:", executor);

        address payable proxy = payable(vm.envAddress("VTAO_ADDRESS"));
        console.log("Chain id:", block.chainid);
        console.log("Proxy:", proxy);
        require(proxy.code.length > 0, "VTAO_ADDRESS has no code on this RPC; pass --rpc-url subtensor-evm");

        VirtualTAO vTAO = VirtualTAO(proxy);

        address owner = vTAO.owner();
        console.log("Owner:", owner);
        require(owner == executor, "Executor is not vTAO owner");
        console.log("Paused:", vTAO.paused());

        address oldImpl = _implementation(proxy);
        console.log("Current implementation:", oldImpl);

        vm.startBroadcast(executor);

        VirtualTAO impl = new VirtualTAO();
        console.log("New implementation:", address(impl));
        require(address(impl) != oldImpl, "New implementation matches current");

        // OZ UUPS 5.0.0: empty data does not invoke receive() (which would stake).
        vTAO.upgradeToAndCall(address(impl), "");

        vm.stopBroadcast();

        address newImpl = _implementation(proxy);
        console.log("Implementation after upgrade:", newImpl);
        require(newImpl == address(impl), "Upgrade did not stick");
        require(vTAO.owner() == owner, "Owner changed during upgrade");
        console.log("Paused after:", vTAO.paused());

        console.log("Name:", vTAO.name());
        console.log("Stake netuid 0:", vTAO.getCurrentStake(0));
        try vTAO.pendingRootRewards() returns (uint256 pending) {
            console.log("Pending root rewards:", pending);
        } catch {
            console.log("pendingRootRewards() reverted");
        }
    }

    function _implementation(address proxy) internal view returns (address) {
        return address(uint160(uint256(vm.load(proxy, IMPLEMENTATION_SLOT))));
    }
}
