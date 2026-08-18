// london
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import {Test} from "forge-std/Test.sol";

import {VirtualTAO} from "../contracts/vTAO.sol";
import {IStaking} from "../contracts/interfaces/IStakingV2.sol";
import {GetStakeMock} from "./mocks/mockGetStake.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract TestRootClaim is Test {
    address payable vTAOAddress;
    VirtualTAO vTAO;
    IStaking staking;
    GetStakeMock getStakeMock;

    function setUp() public {
        VirtualTAO impl = new VirtualTAO();
        bytes memory initData = abi.encodeWithSelector(VirtualTAO.initialize.selector, address(this));

        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        vTAOAddress = payable(address(proxy));
        vTAO = VirtualTAO(vTAOAddress);

        GetStakeMock mockImpl = new GetStakeMock();

        vm.allowCheatcodes(address(mockImpl));
        address stakingAddr = address(0x0000000000000000000000000000000000000805);
        vm.etch(stakingAddr, address(mockImpl).code);
        vm.allowCheatcodes(stakingAddr);
        getStakeMock = GetStakeMock(stakingAddr);
        staking = IStaking(stakingAddr);
    }

    function testClaimRootWithHotkey() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        uint256 unclaimedRootTao = 1e17; // 0.1 TAO unclaimed
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);

        // Check the stake of the contract is 0
        assertEq(vTAO.getCurrentStake(0), 0, "vTAO: stake is not 0");

        vTAO.rootClaim();

        // Check the stake of the contract increased by the unclaimed root TAO
        assertEq(vTAO.getCurrentStake(0), unclaimedRootTao, "vTAO: stake is not the unclaimed root TAO");
    }

    function testClaimRootWithHotkeyBelowThreshold() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        uint256 unclaimedRootTao = getStakeMock.UNCLAIMED_ROOT_TAO_THRESHOLD() - 1e9; // 1 RAO below threshold
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);

        uint256 currentStake = vTAO.getCurrentStake(0);
        assertEq(currentStake, 0, "vTAO: stake is not 0");

        // should succeed with no error
        vTAO.rootClaim();

        // Should not have been able to claim
        uint256 newStake = currentStake;
        assertEq(currentStake, newStake, "vTAO: stake changed");
    }

    function testClaimRootWithHotkeyMultipleSubnets() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        uint256 unclaimedRootTao = 1e17; // 0.1 TAO unclaimed
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao + 1e17, 2);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao + 2e17, 3);
        uint256 totalUnclaimedRootTao = unclaimedRootTao * 3 + 1e17 + 2e17;

        // Check the stake of the contract is 0
        assertEq(vTAO.getCurrentStake(0), 0, "vTAO: stake is not 0");

        vTAO.rootClaim();

        // Check the stake of the contract increased by the unclaimed root TAO
        assertEq(vTAO.getCurrentStake(0), totalUnclaimedRootTao, "vTAO: stake is not equal to total unclaimed root TAO");
    }

    function testClaimRootWithHotkeyMultipleSubnetsBelowThreshold() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        uint256 unclaimedRootTao = getStakeMock.UNCLAIMED_ROOT_TAO_THRESHOLD() - 1e9; // 1 RAO below threshold
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 2);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 3);

        // Check the stake of the contract is 0
        uint256 currentStake = vTAO.getCurrentStake(0);
        assertEq(currentStake, 0, "vTAO: stake is not 0");

        vTAO.rootClaim();

        // Should not have been able to claim
        uint256 newStake = vTAO.getCurrentStake(0);
        assertEq(newStake, currentStake, "vTAO: stake changed");
    }

    function testClaimRootWithHotkeyMultipleSubnetsOneBelowThreshold() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        uint256 unclaimedRootTao = 1e17; // 0.1 TAO unclaimed
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao + 1e17, 2);
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao + 2e17, 3);
        // SN4 is below threshold
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, getStakeMock.UNCLAIMED_ROOT_TAO_THRESHOLD() - 1e9, 4);
        
        // We expect SN4 to not be claimed as it is below threshold
        uint256 totalExpectedUnclaimedRootTao = unclaimedRootTao * 3 + 1e17 + 2e17;

        // Check the stake of the contract is 0
        assertEq(vTAO.getCurrentStake(0), 0, "vTAO: stake is not 0");

        vTAO.rootClaim();

        // Check the stake of the contract increased by the unclaimed root TAO
        assertEq(vTAO.getCurrentStake(0), totalExpectedUnclaimedRootTao, "vTAO: stake is not equal to the total expected unclaimed root TAO");
    }

    function testClaimRootWithHotkeyStartsWithStake() public {
        bytes32 coldkey = vTAO.getAddressAsPk();
        bytes32 hotkey = vTAO.getHotkey();

        // Set stake of contract to initial stake
        uint256 initialStake = 123e18;
        getStakeMock._setStake(hotkey, coldkey, 0, initialStake);

        uint256 unclaimedRootTao = getStakeMock.UNCLAIMED_ROOT_TAO_THRESHOLD() + 1e17; // 0.1 TAO above threshold
        getStakeMock._setUnclaimedRootTaoByHotkeyAndNetuidAndColdkey(coldkey, hotkey, unclaimedRootTao, 1);

        // Check the stake of the contract is the initial stake
        assertEq(vTAO.getCurrentStake(0), initialStake, "vTAO: stake is not the initial stake");

        vTAO.rootClaim();

        // Check the stake of the contract increased by the unclaimed root TAO
        assertEq(vTAO.getCurrentStake(0), initialStake + unclaimedRootTao, "vTAO: stake is not the initial stake plus the unclaimed root TAO");
    }

    receive() external payable {
        // receive TAO
    }
}
