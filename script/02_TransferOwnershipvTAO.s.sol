// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {VirtualTAO} from "../contracts/vTAO.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TransferOwnershipvTAO is Script {
    address payable vTAOAddress;
    address newOwnerAddress;
    VirtualTAO vTAO;

    function run() public {

        address[] memory wallets = vm.getWallets();
        require(wallets.length > 0, "No script wallets found");
        address executor = wallets[0];
        console.log("Executor:", executor);
        
        vm.startBroadcast(executor);

        vTAOAddress = payable(vm.envAddress("VTAO_ADDRESS"));
        newOwnerAddress = vm.envAddress("NEW_OWNER_ADDRESS");
        console.log("New owner address:", newOwnerAddress);
        vTAO = VirtualTAO(vTAOAddress);

        console.log("Swapping owner of vTAO");
        console.log("Owner of vTAO", vTAO.owner());

        vTAO.transferOwnership(newOwnerAddress);
        console.log("New owner of vTAO", vTAO.owner());

        vm.stopBroadcast();
    }
}
