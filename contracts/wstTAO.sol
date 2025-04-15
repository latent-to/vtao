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

import {IterableMapping} from "./IterableMapping.sol";

import "./interfaces/IStakingV2.sol";

contract WrappedStakeTAO is Initializable, ERC20Upgradeable, ERC20PausableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable, UUPSUpgradeable, ERC20BurnableUpgradeable {
    // Precompile instances
    IStaking public staking;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();

        staking = IStaking(ISTAKING_ADDRESS);
    }

    string public constant NAME = "Wrapped Staked TAO";
    string public constant SYMBOL = "wstTAO";
    uint public constant INITIAL_SUPPLY = 0;
    // Stakes to Latent Hotkey
    uint16 private _netuid = 0;
    bytes32 private _hotkey = 0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954;

    function initialize(address initialOwner) initializer public {
        __ERC20_init("WrappedStakeTAO", "wstTAO");
        __ERC20Burnable_init();
        __ERC20Pausable_init();
        __Ownable_init(initialOwner);
        __ERC20Permit_init("WrappedStakeTAO");
        __UUPSUpgradeable_init();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20Upgradeable, ERC20PausableUpgradeable)
    {
        super._update(from, to, value);
    }

  function stake(address to) public payable {
    require(msg.value > 0, "wstTAO: can't stake zero TAO");

    uint256 amount = msg.value;

    // Get the current stake of the contract
    uint256 currentStake = getCurrentStake(_netuid);
    // Stake the TAO
    _safeStake(_hotkey, amount, _netuid);
    // Get the new stake of the contract
    uint256 newStake = getCurrentStake(_netuid);
    // Calculate the amount of wstTAO to mint
    uint256 amountToMint = newStake - currentStake;
    // Mint the wstTAO
    _mint(to, amountToMint);
  }

  function unstake(uint256 amount) public {
    if (amount == 0) {
      require(amount > 0, "wstTAO: can't unstake zero wstTAO");
    }
    address to = msg.sender;

    // Convert the wstTAO to TAO; This is the amount we will unstake
    uint256 amountInTAO = wstTAOtoTAO(amount);
    // Get the balance of the contract before unstaking
    uint256 balanceBefore = address(this).balance;
    // Unstake the wstTAO amount
    _safeUnstake(_hotkey, amountInTAO, _netuid);
    // Get the balance of the contract after unstaking
    uint256 balanceAfter = address(this).balance;
    // Calculate the actual amount of TAO the contract got from the unstake
    // Note: safe from underflow because of solidity version
    uint256 actualAmountInTAO = balanceAfter - balanceBefore;

    // Burn the wstTAO
    _burn(to, amount);
    // Transfer the actual amount of TAO from our contract
    _safeTransferTAO(to, actualAmountInTAO); 
  }

  function _safeUnstake(bytes32 hotkey, uint256 amount, uint16 netuid) private {
    require(amount > 0, "wstTAO: can't unstake zero TAO");

    uint256 currentStake = getCurrentStake(netuid);
    require(currentStake >= amount, "wstTAO: current stake is lower than expected");
    
    (bool success, bytes memory data) = ISTAKING_ADDRESS.call(abi.encodeWithSelector(staking.removeStake.selector, hotkey, amount, netuid));
    require(success, "wstTAO: failed to unstake");
  }

  function _safeStake(bytes32 hotkey, uint256 amount, uint16 netuid) private {
    require(amount > 0, "wstTAO: can't stake zero wstTAO");

    require(address(this).balance >= amount, "wstTAO: contract does not have enough balance in unstaked");
    (bool success, bytes memory data) = ISTAKING_ADDRESS.call{value: amount}(abi.encodeWithSelector(staking.addStake.selector, hotkey, amount, netuid));
    require(success, "wstTAO: failed to stake");
  }
  
  /**
  * @notice Shortcut to stake TAO
  */
  receive() external payable {
    stake(msg.sender);
  }

  function wstTAOtoTAO(uint256 amount) view public returns (uint256) {
    uint256 currentStake = getCurrentStake(_netuid);
    uint256 currentIssuane = super.totalSupply();
    return amount / currentIssuane * currentStake;
  }

  function TAOtowstTAO(uint256 amount) view public returns (uint256) {
    uint256 currentStake = getCurrentStake(_netuid);
    uint256 currentIssuane = super.totalSupply();
    return amount / currentStake * currentIssuane;
  }

  function _safeTransferTAO(address to, uint256 amount) private {
    (bool sent, bytes memory data) = to.call{value:amount}("");
    require(sent, "wstTAO: failed to send TAO");
  }

  function getCurrentStake(uint16 netuid) public view returns (uint256) {
    (bool success, bytes memory resultData) = ISTAKING_ADDRESS.staticcall(
      abi.encodeWithSelector(staking.getStake.selector, _hotkey, address(this), netuid)
    );
    require(success, "Failed to read getStake");
    return abi.decode(resultData, (uint256));
  }

  function _transferStake(bytes32 destinationColdkey, bytes32 hotkey, uint16 netuid, uint256 amount) private {
      (bool success, ) = ISTAKING_ADDRESS.call{gas: gasleft()}(
          abi.encodeWithSelector(staking.transferStake.selector, destinationColdkey, hotkey, netuid, netuid, amount)
      );
      require(success, "Move stake call failed");
  }
}
