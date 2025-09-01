// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {ERC20PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import {ERC20PermitUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

import "@openzeppelin/contracts/utils/math/Math.sol";

import "./BLAKE2b.sol";
import "./interfaces/IStakingV2.sol";

contract VirtualTAO is
    Initializable,
    ERC20Upgradeable,
    ERC20PausableUpgradeable,
    OwnableUpgradeable,
    ERC20PermitUpgradeable,
    UUPSUpgradeable,
    ERC20BurnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    event TAOStaked(
        address indexed signer,
        address indexed to,
        uint256 amountEvm,
        uint256 receivedAmount
    );
    event TAOUnstaked(
        address indexed signer,
        address indexed from,
        uint256 amountEvm,
        uint256 receivedAmount
    );

    // Precompile instances
    BLAKE2b private blake2bInstance;

    uint16 private constant _netuid = 0;
    bytes32 private _hotkey;
    bytes32 private _address_as_pk;
    bytes private constant evm_prefix = hex"65766d3a";
    uint256 private _decimalConversionFactor;

    string public constant NAME = "Virtual TAO";
    string public constant SYMBOL = "vTAO";
    uint public constant INITIAL_SUPPLY = 0;

    uint256 public constant MIN_STAKE_AMOUNT = 0.0002 ether; // 0.0002 TAO
    // Must be in RAO decimals
    uint256 public constant MIN_STAKE_BALANCE = 200_000_000; // 0.2 TAO

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        __ERC20_init(NAME, SYMBOL);
        __ERC20Burnable_init();
        __ERC20Pausable_init();
        __Ownable_init(initialOwner);
        __ERC20Permit_init(NAME);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

        _hotkey = 0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954;
        _decimalConversionFactor = 10 ** 9;

        blake2bInstance = new BLAKE2b();

        bytes memory address_bytes = abi.encodePacked(address(this));
        bytes memory input = new bytes(24);
        for (uint i = 0; i < 4; i++) {
            input[i] = evm_prefix[i];
        }
        for (uint i = 0; i < 20; i++) {
            input[i + 4] = address_bytes[i];
        }
        _address_as_pk = blake2bInstance.blake2b_256(input);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // The following functions are overrides required by Solidity.

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        super._update(from, to, value);
    }

    function _stakeWithAmount(address to, uint256 amountEvm) private {
        require(amountEvm > 0, "vTAO: can't stake zero TAO");
        require(
            amountEvm >= MIN_STAKE_AMOUNT,
            "vTAO: can't stake less than the min amount."
        );

        // Get the current stake of the contract, this will be in RAO decimals
        uint256 currentStakeRaoDecimals = getCurrentStake(_netuid);

        // Initial stake balance needs to be 0.1 TAO, no addStake fee
        if (currentStakeRaoDecimals == 0) {
            // 0.1 TAO min balance
            require(amountEvm >= MIN_STAKE_BALANCE, "stake lt minStake");
        }

        // Stake the TAO
        _safeStake(_hotkey, amountEvm, _netuid);
        // Get the new stake of the contract
        uint256 newStakeRaoDecimals = getCurrentStake(_netuid);
        require(
            newStakeRaoDecimals > currentStakeRaoDecimals,
            "vTAO: stake didn't increase"
        );
        // Calculate the amount of TAO staked
        uint256 amountStakedRaoDecimals = newStakeRaoDecimals -
            currentStakeRaoDecimals;
        // Calculate the amount of vTAO to mint
        uint256 amountToMintEvmDecimals = TAOtovTAO_with_current_stake(
            amountStakedRaoDecimals,
            currentStakeRaoDecimals
        );
        require(amountToMintEvmDecimals > 0, "vTAO: amount to mint is zero");
        // Mint the vTAO
        _mint(to, amountToMintEvmDecimals);

        emit TAOStaked(msg.sender, to, amountEvm, amountToMintEvmDecimals);
    }

    function unstake(uint256 amountEvm) public nonReentrant {
        require(amountEvm > 0, "vTAO: can't unstake zero vTAO");
        require(
            amountEvm > MIN_STAKE_AMOUNT,
            "vTAO: can't unstake less than the min amount."
        );

        require(
            getCurrentStake(_netuid) > 0,
            "vTAO: can't unstake vTAO if the contract has no stake"
        );

        address from = msg.sender;
        require(
            balanceOf(from) >= amountEvm,
            "vTAO: can't unstake more vTAO than user has"
        );

        // Convert the vTAO to TAO; This is the amount we will unstake
        uint256 amountInTAORaoDecimals = vTAOtoTAO(amountEvm);
        uint256 amountInTAOEvmDecimals = _decimalConversionFactor *
            amountInTAORaoDecimals;
        // Get the balance of the contract before unstaking
        uint256 balanceBeforeEvmDecimals = address(this).balance;
        // Unstake the vTAO amount
        _safeUnstake(_hotkey, amountInTAORaoDecimals, _netuid);
        // Get the balance of the contract after unstaking
        uint256 balanceAfterEvmDecimals = address(this).balance;
        require(
            balanceAfterEvmDecimals > balanceBeforeEvmDecimals,
            "vTAO: balance didn't increase"
        );

        // Calculate the actual amount of TAO the contract got from the unstake
        // Note: safe from underflow because of solidity version
        uint256 actualAmountInTAOEvmDecimals = balanceAfterEvmDecimals -
            balanceBeforeEvmDecimals;

        require(
            actualAmountInTAOEvmDecimals <= amountInTAOEvmDecimals,
            "vTAO: unstake got more than expected"
        );

        // Only allow unstake up to the amount of TAO the balance should've corresponded to
        uint256 amountToSend = Math.min(
            amountInTAOEvmDecimals,
            actualAmountInTAOEvmDecimals
        );

        // Burn the vTAO
        _burn(from, amountEvm);
        // Transfer the actual amount of TAO from our contract
        _safeTransferTAO(from, amountToSend);

        emit TAOUnstaked(msg.sender, from, amountEvm, amountToSend);
    }

    function _safeUnstake(
        bytes32 hotkey,
        uint256 amountRaoDecimals,
        uint16 netuid
    ) private {
        require(amountRaoDecimals > 0, "vTAO: can't unstake zero TAO");

        uint256 currentStake = getCurrentStake(netuid);
        require(
            currentStake >= amountRaoDecimals,
            "vTAO: current stake is lower than expected"
        );

        (bool success, ) = ISTAKING_ADDRESS.call(
            abi.encodeWithSelector(
                IStaking.removeStake.selector,
                hotkey,
                amountRaoDecimals,
                uint256(netuid)
            )
        );
        require(success, "vTAO: failed to unstake");
    }

    function _safeStake(
        bytes32 hotkey,
        uint256 amountEvm,
        uint16 netuid
    ) private {
        require(amountEvm > 0, "vTAO: can't stake zero vTAO");
        uint256 amountRaoDecimals = amountEvm / _decimalConversionFactor;
        //require(address(this).balance >= amount, "vTAO: contract does not have enough balance in unstaked");
        (bool success, ) = ISTAKING_ADDRESS.call(
            abi.encodeWithSelector(
                IStaking.addStake.selector,
                hotkey,
                amountRaoDecimals,
                netuid
            )
        );
        require(success, "vTAO: failed to stake");
    }

    function stake(address to) public payable nonReentrant {
        uint256 amountEvm = msg.value; // This is the amount in EVM decimals

        uint256 currentBalance = address(this).balance;

        if (amountEvm == 0.000_000_500 ether && currentBalance == 0 ether) {
            return; // Allow donating 500 RAO to the contract
        } else {
            uint256 currentStakeRaoDecimals = getCurrentStake(_netuid);
            // Otherwise, require the stake balance to be at least the min balance
            require(
                currentStakeRaoDecimals +
                    (amountEvm / _decimalConversionFactor) >=
                    MIN_STAKE_BALANCE,
                "vTAO: can't have a stake balance less than the min stake balance."
            );

            _stakeWithAmount(to, amountEvm);
        }
    }

    /**
     * @notice Shortcut to stake TAO
     */
    receive() external payable {
        stake(msg.sender);
    }

    /**
     * @notice Convert vTAO to TAO
     * @param amountEvm The amount of vTAO to convert
     * @return amountRaoDecimals The amount of TAO in RAO decimals
     */
    function vTAOtoTAO(uint256 amountEvm) public view returns (uint256) {
        uint256 currentStakeRaoDecimals = getCurrentStake(_netuid);
        uint256 currentIssuance = super.totalSupply();
        if (currentIssuance == 0) {
            return 0; // should never happen
        }
        return (amountEvm * currentStakeRaoDecimals) / currentIssuance;
    }

    function TAOtovTAO_with_current_stake(
        uint256 amountRaoDecimals,
        uint256 currentStakeRaoDecimals
    ) public view returns (uint256) {
        uint256 currentIssuance = super.totalSupply();
        if (currentIssuance == 0 || currentStakeRaoDecimals == 0) {
            // Issue 1:1, with decimal conversion
            return amountRaoDecimals * _decimalConversionFactor; // Would happen on init.
        }
        return (amountRaoDecimals * currentIssuance) / currentStakeRaoDecimals;
    }

    function TAOtovTAO(
        uint256 amountRaoDecimals
    ) public view returns (uint256) {
        uint256 currentStakeRaoDecimals = getCurrentStake(_netuid);
        uint256 currentIssuance = super.totalSupply();
        if (currentIssuance == 0 || currentStakeRaoDecimals == 0) {
            // Issue 1:1, with decimal conversion
            return amountRaoDecimals * _decimalConversionFactor; // Would happen on init.
        }
        return (amountRaoDecimals * currentIssuance) / currentStakeRaoDecimals;
    }

    function _safeTransferTAO(address to, uint256 amountEvm) private {
        //require(address(this).balance >= amount, "vTAO: contract does not have enough balance in unstaked");
        (bool sent, ) = to.call{value: amountEvm, gas: gasleft()}("");
        require(sent, "vTAO: failed to send TAO");
    }

    function getCurrentStake(uint16 netuid) public view returns (uint256) {
        (bool success, bytes memory resultData) = ISTAKING_ADDRESS.staticcall(
            abi.encodeWithSelector(
                IStaking.getStake.selector,
                _hotkey,
                _address_as_pk,
                netuid
            )
        );

        require(success, "Failed to read getStake");
        if (resultData.length == 0) {
            return 0;
        }
        return abi.decode(resultData, (uint256));
    }

    function getAddressAsPk() public view returns (bytes32) {
        return _address_as_pk;
    }
}
