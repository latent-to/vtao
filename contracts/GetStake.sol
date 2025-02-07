// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

address constant IGETSTAKE_ADDRESS = 0x0000000000000000000000000000000000000123; // TODO

interface IGetStake {
  function getStake(bytes32 hotkey, bytes32 coldkey, uint16 netuid) external view returns (uint256);
}