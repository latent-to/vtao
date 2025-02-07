// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {WrappedStakeTAO} from "./wstTAO.sol";

contract TestWstTAO is WrappedStakeTAO {
    constructor() WrappedStakeTAO() {}
    
    function getStakeQueue() public view returns (address[] memory, uint256[] memory) {
        return (super.stakeQueue.keys, super.stakeQueue.values);
    }

    function getUnstakeQueue() public view returns (address[] memory, uint256[] memory) {
        return (super.unstakeQueue.keys, super.unstakeQueue.values);
    }   

    function getStakeQueueTotal() public view returns (uint256) {
        return super.stakeQueueTotal;
    }

    function getUnstakeQueueTotal() public view returns (uint256) {
        return super.unstakeQueueTotal;
    }

    function setStakeQueueTotal(uint256 total) public {
        super.stakeQueueTotal = total;
    }

    function setUnstakeQueueTotal(uint256 total) public {
        super.unstakeQueueTotal = total;
    }

    function setStakeQueue(address[] memory keys, uint256[] memory values) public {
        super.stakeQueue.clear();

        for (uint256 i = 0; i < keys.length; i++) {
            super.stakeQueue.inserted[keys[i]] = true;
            super.stakeQueue.indexOf[keys[i]] = i;
            super.stakeQueue.keys.push(keys[i]);
            super.stakeQueue.values[keys[i]] = values[i];
        }
    }

    function setUnstakeQueue(address[] memory keys, uint256[] memory values) public {
        super.unstakeQueue.clear();

        for (uint256 i = 0; i < keys.length; i++) {
            super.unstakeQueue.inserted[keys[i]] = true;
            super.unstakeQueue.indexOf[keys[i]] = i;
            super.unstakeQueue.keys.push(keys[i]);
            super.unstakeQueue.values[keys[i]] = values[i];
        }
    }
}