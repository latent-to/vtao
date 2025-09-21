// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { vTAOOFTAdapter } from "../vTAOOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract MyOFTAdapterMock is vTAOOFTAdapter {
    constructor(address _token, address _lzEndpoint, address _delegate) vTAOOFTAdapter(_token, _lzEndpoint, _delegate) {}
}
