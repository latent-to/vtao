// london
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import {IStaking} from "../../contracts/interfaces/IStakingV2.sol";
import {BLAKE2b} from "../../contracts/BLAKE2b.sol";

import {Vm} from "forge-std/Vm.sol";

contract GetStakeMock is IStaking {
    Vm public constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    bytes private constant evm_prefix = hex"65766d3a";
    
    mapping(bytes32 => mapping(bytes32 => mapping(uint16 => uint256))) public stakeMapping;
    
    // mocks
    function getStake(bytes32 hotkey, bytes32 coldkey, uint256 netuid) external view returns (uint256) {
        uint16 netuid16 = uint16(netuid);
        
        return stakeMapping[hotkey][coldkey][netuid16];
    }

    function _getAddressAsPk(address addr) internal returns (bytes32) {
        BLAKE2b blake2bInstance = new BLAKE2b();

        bytes memory address_bytes = abi.encodePacked(addr);
        bytes memory input = new bytes(24);
        for (uint i = 0; i < 4; i++) {
            input[i] = evm_prefix[i];
        }
        for (uint i = 0; i < 20; i++) {
            input[i + 4] = address_bytes[i];
        }
        bytes32 address_as_pk = blake2bInstance.blake2b_256(input);

        return address_as_pk;
    }

    function addStake(
        bytes32 hotkey,
        uint256 amount, // in rao
        uint256 netuid
    ) external payable {
        address coldkey = msg.sender;

        bytes32 coldkeyBytes = _getAddressAsPk(coldkey);
        uint16 netuid16 = uint16(netuid);

        uint256 amountEvm = amount * 1e9;

        // deduct from the sender's balance
        vm.deal(address(msg.sender), address(msg.sender).balance - amountEvm);

        stakeMapping[hotkey][coldkeyBytes][netuid16] += amount;
    }

    function removeStake(
        bytes32 hotkey,
        uint256 amount,
        uint256 netuid
    ) external {
        address coldkey = msg.sender;
        bytes32 coldkeyBytes = _getAddressAsPk(coldkey);
        uint16 netuid16 = uint16(netuid);

        stakeMapping[hotkey][coldkeyBytes][netuid16] -= amount;

        uint256 amountEvm = amount * 1e9;
        vm.deal(coldkey, coldkey.balance + amountEvm);
    }

    // testing function to set the stake
    function _setStake(bytes32 hotkey, bytes32 coldkey, uint16 netuid, uint256 amount) external {
        stakeMapping[hotkey][coldkey][netuid] = amount;
    }

    /**
     * @dev Delegates staking to a proxy account.
     *
     * @param delegate The public key (32 bytes) of the delegate.
     */
    function addProxy(bytes32 delegate) external override {
        // do nothing
    }

    /**
     * @dev Removes staking proxy account.
     *
     * @param delegate The public key (32 bytes) of the delegate.
     */
    function removeProxy(bytes32 delegate) external override {
        // do nothing
    }
    
    /**
     * @dev Moves a subtensor stake `amount` associated with the `hotkey` to a different hotkey
     * `destination_hotkey`.
     *
     * This function allows external accounts and contracts to move staked TAO from one hotkey to another,
     * which effectively calls `move_stake` on the subtensor pallet with specified origin and destination
     * hotkeys as parameters being the hashed address mappings of H160 sender address to Substrate ss58
     * address as implemented in Frontier HashedAddressMapping:
     * https://github.com/polkadot-evm/frontier/blob/2e219e17a526125da003e64ef22ec037917083fa/frame/evm/src/lib.rs#L739
     *
     * @param origin_hotkey The origin hotkey public key (32 bytes).
     * @param destination_hotkey The destination hotkey public key (32 bytes).
     * @param origin_netuid The subnet to move stake from (uint256).
     * @param destination_netuid The subnet to move stake to (uint256).
     * @param amount The amount to move in rao.
     *
     * Requirements:
     * - `origin_hotkey` and `destination_hotkey` must be valid hotkeys registered on the network, ensuring
     * that the stake is correctly attributed.
     */
    function moveStake(
        bytes32 origin_hotkey,
        bytes32 destination_hotkey,
        uint256 origin_netuid,
        uint256 destination_netuid,
        uint256 amount
    ) external override {
        // do nothing
    }

    /**
     * @dev Transfer a subtensor stake `amount` associated with the transaction signer to a different coldkey
     * `destination_coldkey`.
     *
     * This function allows external accounts and contracts to transfer staked TAO to another coldkey,
     * which effectively calls `transfer_stake` on the subtensor pallet with specified destination
     * coldkey as a parameter being the hashed address mapping of H160 sender address to Substrate ss58
     * address as implemented in Frontier HashedAddressMapping:
     * https://github.com/polkadot-evm/frontier/blob/2e219e17a526125da003e64ef22ec037917083fa/frame/evm/src/lib.rs#L739
     *
     * @param destination_coldkey The destination coldkey public key (32 bytes).
     * @param hotkey The hotkey public key (32 bytes).
     * @param origin_netuid The subnet to move stake from (uint256).
     * @param destination_netuid The subnet to move stake to (uint256).
     * @param amount The amount to move in rao.
     *
     * Requirements:
     * - `origin_hotkey` and `destination_hotkey` must be valid hotkeys registered on the network, ensuring
     * that the stake is correctly attributed.
     */
    function transferStake(
        bytes32 destination_coldkey,
        bytes32 hotkey,
        uint256 origin_netuid,
        uint256 destination_netuid,
        uint256 amount
    ) external override {
        // do nothing
    }

    /**
     * @dev Returns the amount of RAO staked by the coldkey.
     *
     * This function allows external accounts and contracts to query the amount of RAO staked by the coldkey
     * which effectively calls `get_total_coldkey_stake` on the subtensor pallet with
     * specified coldkey as a parameter.
     *
     * @param coldkey The coldkey public key (32 bytes).
     * @return The amount of RAO staked by the coldkey.
     */
    function getTotalColdkeyStake(
        bytes32 coldkey
    ) external view returns (uint256) {
        // do nothing
    }

    /**
     * @dev Returns the total amount of stake under a hotkey (delegative or otherwise)
     *
     * This function allows external accounts and contracts to query the total amount of RAO staked under a hotkey
     * which effectively calls `get_total_hotkey_stake` on the subtensor pallet with
     * specified hotkey as a parameter.
     *
     * @param hotkey The hotkey public key (32 bytes).
     * @return The total amount of RAO staked under the hotkey.
     */
    function getTotalHotkeyStake(
        bytes32 hotkey
    ) external view returns (uint256) {
        // do nothing
    }

    /**
     * @dev Returns the validators that have staked alpha under a hotkey.
     *
     * This function retrieves the validators that have staked alpha under a specific hotkey.
     * It is a view function, meaning it does not modify the state of the contract and is free to call.
     *
     * @param hotkey The hotkey public key (32 bytes).
     * @param netuid The subnet the stake is on (uint256).
     * @return An array of validators that have staked alpha under the hotkey.
     */
    function getAlphaStakedValidators(
        bytes32 hotkey,
        uint256 netuid
    ) external view returns (uint256[] memory) {
        // do nothing
    }

    /**
     * @dev Returns the total amount of alpha staked under a hotkey.
     *
     * This function retrieves the total amount of alpha staked under a specific hotkey.
     * It is a view function, meaning it does not modify the state of the contract and is free to call.
     *
     * @param hotkey The hotkey public key (32 bytes).
     * @param netuid The subnet the stake is on (uint256).
     * @return The total amount of alpha staked under the hotkey.
     */
    function getTotalAlphaStaked(
        bytes32 hotkey,
        uint256 netuid
    ) external view returns (uint256) {
        // do nothing
    }

    /**
     * @dev Adds a subtensor stake `amount` associated with the `hotkey` within a price limit.
     *
     * This function allows external accounts and contracts to stake TAO into the subtensor pallet,
     * which effectively calls `add_stake_limit` on the subtensor pallet with specified hotkey as a parameter
     * and coldkey being the hashed address mapping of H160 sender address to Substrate ss58 address as
     * implemented in Frontier HashedAddressMapping:
     * https://github.com/polkadot-evm/frontier/blob/2e219e17a526125da003e64ef22ec037917083fa/frame/evm/src/lib.rs#L739
     *
     * @param hotkey The hotkey public key (32 bytes).
     * @param amount The amount to stake in rao.
     * @param limit_price The price limit to stake at in rao. Number of rao per alpha.
     * @param allow_partial Whether to allow partial stake.
     * @param netuid The subnet to stake to (uint256).
     *
     * Requirements:
     * - `hotkey` must be a valid hotkey registered on the network, ensuring that the stake is
     *   correctly attributed.
     */
    function addStakeLimit(
        bytes32 hotkey,
        uint256 amount,
        uint256 limit_price,
        bool allow_partial,
        uint256 netuid
    ) external payable override {
        // do nothing
    }

    /**
     * @dev Removes a subtensor stake `amount` from the specified `hotkey` within a price limit.
     *
     * This function allows external accounts and contracts to unstake TAO from the subtensor pallet,
     * which effectively calls `remove_stake_limit` on the subtensor pallet with specified hotkey as a parameter
     * and coldkey being the hashed address mapping of H160 sender address to Substrate ss58 address as
     * implemented in Frontier HashedAddressMapping:
     * https://github.com/polkadot-evm/frontier/blob/2e219e17a526125da003e64ef22ec037917083fa/frame/evm/src/lib.rs#L739
     *
     * @param hotkey The hotkey public key (32 bytes).
     * @param amount The amount to unstake in alpha.
     * @param limit_price The price limit to unstake at in rao. Number of rao per alpha.
     * @param allow_partial Whether to allow partial unstake.
     * @param netuid The subnet to stake to (uint256).
     *
     * Requirements:
     * - `hotkey` must be a valid hotkey registered on the network, ensuring that the stake is
     *   correctly attributed.
     * - The existing stake amount must be not lower than specified amount
     */
    function removeStakeLimit(
        bytes32 hotkey,
        uint256 amount,
        uint256 limit_price,
        bool allow_partial,
        uint256 netuid
    ) external override {
        // do nothing
    }
}