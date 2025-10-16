// london
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";

import {VirtualTAO} from "../contracts/vTAO.sol";
import {IStaking} from "../contracts/interfaces/IStakingV2.sol";
import {GetStakeMock} from "./mocks/mockGetStake.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract TestStakeUnstake is Test {
    address payable vTAOAddress;
    VirtualTAO vTAO;
    IStaking staking;

    function setUp() public {
        VirtualTAO impl = new VirtualTAO();
        bytes memory initData = abi.encodeWithSelector(VirtualTAO.initialize.selector, address(this));

        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        vTAOAddress = payable(address(proxy));
        vTAO = VirtualTAO(vTAOAddress);

        GetStakeMock getStakeMock = new GetStakeMock();

        vm.allowCheatcodes(address(getStakeMock));
        vm.etch(address(0x0000000000000000000000000000000000000805), address(getStakeMock).code);
        staking = IStaking(address(0x0000000000000000000000000000000000000805));
    }

    function testStakeUnstakeNoPriorStake() public {
        bytes32 hotkey = 0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954;
        bytes32 coldkey = vTAO.getAddressAsPk();
        uint256 netuid = 0;
        uint256 currentIssuance = vTAO.totalSupply();
        uint256 currentStakeRaoDecimals = vTAO.getCurrentStake(0);

        uint256 toStake = 1 * 1e9; // 1 TAO in RAO decimals
        uint256 toStakeEvm = toStake * 1e9;
        vm.deal(address(this), toStakeEvm + 1e18); // 1 extra TAO for gas

        uint256 expectedVTAO = toStakeEvm; // no prior stake in contract

        assertEq(staking.getStake(hotkey, coldkey, 0), 0);

        vTAO.stake{value: toStakeEvm}(address(this));

        assertEq(staking.getStake(hotkey, coldkey, 0), toStake);

        assertEq(vTAO.balanceOf(address(this)), expectedVTAO);

        uint256 toUnstake = 9 * 1e17; // 0.9 vTAO in EVM decimals

        vTAO.unstake(toUnstake);

        assertEq(vTAO.balanceOf(address(this)), 1 * 1e17);
        assertEq(address(this).balance, 1e18 + 9e17);

        assertEq(staking.getStake(hotkey, coldkey, 0), 1e8); // 0.1 TAO in RAO decimals
    }

    receive() external payable {
        // receive TAO
    }
}