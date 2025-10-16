// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {VirtualTAO} from "../contracts/vTAO.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract DeployvTAO is Script {
    function run() public {
        address[] memory wallets = vm.getWallets();
        require(wallets.length > 0, "No script wallets found");
        address exectutor = wallets[0];

        vm.startBroadcast();
        
        VirtualTAO impl = new VirtualTAO();
        console.log("impl deployed to:", address(impl));

        bytes memory initData = abi.encodeWithSelector(VirtualTAO.initialize.selector, exectutor);

        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        console.log("proxy deployed to:", address(proxy));
        
        vm.stopBroadcast();
    }
}