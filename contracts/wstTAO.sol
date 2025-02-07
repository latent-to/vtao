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

import "./Staking.sol";
import "./GetStake.sol";
import {IterableMapping} from "./IterableMapping.sol";

contract WrappedStakeTAO is Initializable, ERC20Upgradeable, ERC20PausableUpgradeable, OwnableUpgradeable, ERC20PermitUpgradeable, UUPSUpgradeable, ERC20BurnableUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    string public constant NAME = "Wrapped Staked TAO";
    string public constant SYMBOL = "wstTAO";
    uint public constant INITIAL_SUPPLY = 0;
    // Stakes to Latent Hotkey
    uint private _netuid = 0;
    bytes32 private _hotkey = 0x20b0f8ac1d5416d32f5a552f98b570f06e8392ccb803029e04f63fbe0553c954;

    IterableMapping.Map private stakeQueue;
    uint private stakeQueueTotal = 0;

    IterableMapping.Map private unstakeQueue;
    uint private unstakeQueueTotal = 0;

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

    // First substract from mapping
    uint256 remaining = amount;
    uint256 fastStaked = unstakeQueue.get(to);
    uint256 fastStakedTAO = wstTAOtoTAO(fastStaked);
    if (fastStakedTAO < amount) {
      remaining = amount - fastStakedTAO;
    } else {
      remaining = 0;
    }

    // Add to mapping
    if (remaining > 0) {
      uint256 oldValue = stakeQueue.get(to);
      stakeQueue.set(to, oldValue + remaining);
      stakeQueueTotal += remaining;
    }

    // Process existing staked
    if (fastStaked > 0) {
      doFastStakeSelf(to, fastStakedTAO);
    }
  }

  function doFastStakeSelf(address to, uint256 fastStakedTAO) private {
    uint256 inWstTAO = TAOtowstTAO(fastStakedTAO);
    require(this.balanceOf(address(this)) >= inWstTAO, "wstTAO: contract does not have enough balance in staked");
    require(unstakeQueue.get(to) >= inWstTAO, "wstTAO: user does not have enough unstake requested");
    require(unstakeQueueTotal >= inWstTAO, "wstTAO: unstakedQueueTotal is lower than expected");

    // Can just deduct and send
    unstakeQueue.set(to, unstakeQueue.get(to) - inWstTAO);
    unstakeQueueTotal -= inWstTAO;
    _transfer(address(this), to, inWstTAO);

    // Also give the user the TAO
    safeTransferTAO(to, fastStakedTAO);

    if (unstakeQueue.get(to) == 0) {
      // Remove the user from the unstake queue
      unstakeQueue.remove(to);
    }
  }

  function doFastUnstakeSelf(address to, uint256 fastUnstaked) private {
    uint256 fastUnstakedTAO = wstTAOtoTAO(fastUnstaked);
    require(address(this).balance >= fastUnstakedTAO, "wstTAO: contract does not have enough balance in unstaked");
    require(stakeQueue.get(to) >= fastUnstakedTAO, "wstTAO: user does not have enough stake requested");
    require(stakeQueueTotal >= fastUnstakedTAO, "wstTAO: stakeQueueTotal is lower than expected");
    // Can just deduct and send
    stakeQueue.set(to, stakeQueue.get(to) - fastUnstakedTAO);
    stakeQueueTotal -= fastUnstakedTAO;
    safeTransferTAO(to, fastUnstakedTAO);
    // Also give the user the wstTAO
    _transfer(address(this), to, fastUnstaked);

    if (stakeQueue.get(to) == 0) {
      // Remove the user from the stake queue
      stakeQueue.remove(to);
    }
  }

  function unstake(uint256 amount) public {
    if (amount == 0) {
      require(amount > 0, "wstTAO: can't unstake zero wstTAO");
    }
    address to = msg.sender;

    // Transfer wstTAO to the contract
    _transfer(to, address(this), amount);

    // First substract from mapping
    uint256 remaining = amount;
    uint256 fastUnstakedTAO = stakeQueue.get(to);
    uint256 fastUnstaked = TAOtowstTAO(fastUnstakedTAO);
    if (fastUnstaked < amount) {
      remaining = amount - fastUnstaked;
    } else {
      remaining = 0;
    }

    if (remaining > 0) {
      uint256 oldValue = unstakeQueue.get(to);
      unstakeQueue.set(to, oldValue + remaining);
      unstakeQueueTotal += remaining;
    }

    // Process existing unstaked
    if (fastUnstaked > 0) {
      doFastUnstakeSelf(to, fastUnstaked);
    }
  }

  function fastUnstake(uint256 amount) public {
    if (amount == 0) {
      require(amount > 0, "wstTAO: can't unstake zero wstTAO");
    }
    address to = msg.sender;

    // Transfer wstTAO to the contract
    _transfer(to, address(this), amount);

    // First substract from self mapping
    uint256 remaining = amount;
    uint256 fastUnstakedTAO = stakeQueue.get(to);
    uint256 fastUnstaked = TAOtowstTAO(fastUnstakedTAO);
    if (fastUnstaked < amount) {
      remaining = amount - fastUnstaked;
    } else {
      remaining = 0;
    }

    // Process existing unstaked
    if (fastUnstaked > 0) {
      doFastUnstakeSelf(to, fastUnstaked);
    }

    if (remaining > 0) {
      // Check if we have enough TAO in the rest of the stake queue
      uint256 amountInTAO = wstTAOtoTAO(remaining);
      require(stakeQueueTotal >= amountInTAO, "wstTAO: not enough TAO in the stake queue for fast unstake");
      require(address(this).balance >= amountInTAO, "wstTAO: contract does not have enough balance in unstaked");

      // Give the user TAO from the stake queue
      safeTransferTAO(to, amountInTAO);

      // Match the TAO to a stake queue request
      uint256 i = 0;
      address[] memory _toRemove;
      while (amountInTAO > 0) {
        address key = stakeQueue.getKeyAtIndex(i);
        uint256 amountToStake = stakeQueue.get(key);
        uint256 matchedAmount = 0;
        if (amountToStake >= amountInTAO) { 
          // This user from the queue wants to stake more than we need to unstake
          matchedAmount = amountInTAO;
          stakeQueue.set(key, amountToStake - amountInTAO);

          if (amountToStake == amountInTAO) {
            _toRemove.push(key);
          }
        } else {
          matchedAmount = amountToStake;
          _toRemove.push(key);
        }
        uint256 wstTAOtoTransfer = TAOtowstTAO(matchedAmount);
        // *Transfer* wstTAO to the user from the stake queue
        _transfer(address(this), key, wstTAOtoTransfer);

        // Remove the amount from the remaining amount
        amountInTAO -= matchedAmount;
        stakeQueueTotal -= matchedAmount;
       
        i++;
      }
      for (uint256 j = 0; j < _toRemove.length; j++) {
        // Remove any users that were cleared from the stake queue
        stakeQueue.remove(_toRemove[j]);
      }
    }
  }

  function fastStake(address to) public payable {
    require(msg.value > 0, "wstTAO: can't stake zero TAO");

    uint256 amount = msg.value;

    // First substract from mapping
    uint256 remaining = amount;
    uint256 fastStaked = unstakeQueue.get(to);
    uint256 fastStakedTAO = wstTAOtoTAO(fastStaked);
    if (fastStakedTAO < amount) {
      remaining = amount - fastStakedTAO;
    } else {
      remaining = 0;
    }

    // Process existing staked
    if (fastStaked > 0) {
      doFastStakeSelf(to, fastStakedTAO);
    }

    if (remaining > 0) {
      // Check if we have enough TAO in the rest of the unstake queue
      uint256 amountInWstTAO = TAOtowstTAO(remaining);
      require(unstakeQueueTotal >= amountInWstTAO, "wstTAO: not enough TAO in the unstake queue for fast stake");
      require(this.balanceOf(address(this)) >= amountInWstTAO, "wstTAO: contract does not have enough balance of wstTAO");

      // Give the user wstTAO from the unstake queue
      _transfer(address(this), to, amountInWstTAO);

      // Match the wstTAO to an unstake queue request
      uint256 i = 0;
      address[] memory _toRemove;
      while (amountInWstTAO > 0) {
        address key = unstakeQueue.getKeyAtIndex(i);
        uint256 amountToUnstake = unstakeQueue.get(key);
        uint256 matchedAmount = 0;
        if (amountToUnstake >= amountInWstTAO) { 
          // This user from the queue wants to unstake more than we need to stake
          matchedAmount = amountInWstTAO;
          unstakeQueue.set(key, amountToUnstake - amountInWstTAO);

          if (amountToUnstake == amountInWstTAO) {
            _toRemove.push(key);
          }
        } else {
          matchedAmount = amountToUnstake;
          _toRemove.push(key);
        }
        uint256 TAOtoTransfer = wstTAOtoTAO(matchedAmount);
        // *Transfer* TAO to the user from the unstake queue
        safeTransferTAO(to, TAOtoTransfer);

        // Remove the amount from the remaining amount
        amountInWstTAO -= matchedAmount;
        unstakeQueueTotal -= matchedAmount;
       
        i++;
      }
      for (uint256 j = 0; j < _toRemove.length; j++) {
        // Remove any users that were cleared from the unstake queue
        unstakeQueue.remove(_toRemove[j]);
      }
    }
  }

  function safeUnstake(bytes32 hotkey, uint256 amount, uint16 netuid) private {
    require(amount > 0, "wstTAO: can't unstake zero TAO");

    IStaking staking = IStaking(ISTAKING_ADDRESS);

    uint256 currentStake = getCurrentStake(netuid);
    require(currentStake >= amount, "wstTAO: current stake is lower than expected");
    
    (bool success, bytes memory data) = staking.call(abi.encodeWithSelector(IStaking.removeStake.selector, hotkey, amount, netuid));
    require(success, "wstTAO: failed to unstake");
  }

  function safeStake(bytes32 hotkey, uint256 amount, uint16 netuid) private {
    require(amount > 0, "wstTAO: can't stake zero wstTAO");

    IStaking staking = IStaking(ISTAKING_ADDRESS);
    require(address(this).balance >= amount, "wstTAO: contract does not have enough balance in unstaked");
    (bool success, bytes memory data) = staking.call{value: amount}(abi.encodeWithSelector(IStaking.addStake.selector, hotkey, netuid));
    require(success, "wstTAO: failed to stake");
  }

  function processStakes() public onlyOwner {
    IStaking staking = IStaking(ISTAKING_ADDRESS);

    // Order here is important.
    // If we make the stake/unstake operations first, then we can't convert wstTAO/TAO
    // because the stake amount gets updated.
    // Instead, we can will do the conversion, then stake/unstake, then mint/transfer.
    uint256 unstakeQueueTAO = wstTAOtoTAO(unstakeQueueTotal);
    uint256 stakeQueueWstTAO = TAOtowstTAO(stakeQueueTotal);

    mapping(address => uint256) memory _unstakeQueue;
    mapping(address => uint256) memory _stakeQueue;

    // == Run conversions ==

    // Process unstake queue
    if (unstakeQueueTotal > 0) {
      // Loop through unstake queue and calculate the amount in TAO
      for (uint256 i = 0; i < unstakeQueue.size(); i++) {
          // Transfer the unstaked amount to the user
          address key = unstakeQueue.getKeyAtIndex(i);
          uint256 amount = unstakeQueue.get(key); // in wstTAO
          uint256 amountInTAO = wstTAOtoTAO(amount);
          // Store for later
          _unstakeQueue[key] = amountInTAO;
      }
    }

    // Process stake queue
    if (stakeQueueTotal > 0) {
      // Loop through stake queue and calculate the amount in wstTAO
      for (uint256 i = 0; i < stakeQueue.size(); i++) {
          // Mint wstTAO to the user
          address key = stakeQueue.getKeyAtIndex(i);
          uint256 amount = stakeQueue.get(key);
          uint256 wstTAOtoMint = TAOtowstTAO(amount);
          // Store for later
          _stakeQueue[key] = wstTAOtoMint;
      }
    }

    // == Complete stake/unstake transaction ==
    if (unstakeQueueTAO > stakeQueueTotal) {
      // Unstake (in TAO)
      uint256 unstakeAmount = unstakeQueueTAO - stakeQueueTotal;
      safeUnstake(_hotkey, unstakeAmount, _netuid);
    } else if (unstakeQueueTAO < stakeQueueTotal) {
      // Stake (in TAO)
      uint256 stakeAmount = stakeQueueTotal - unstakeQueueTAO;
      safeStake(_hotkey, stakeAmount, _netuid);
    } else {
      // No Op
    }

    // == Mint/Transfer/Burn ==

    // Transfer unstaked TAO and burn wstTAO
    if (unstakeQueueTotal > 0) {
      for (uint256 i = 0; i < unstakeQueue.size(); i++) {
        address key = unstakeQueue.getKeyAtIndex(i);
        uint256 amountInWstTAO = unstakeQueue.get(key);
        uint256 amountInTAO = _unstakeQueue[key]; // Make sure to use the converted amount
        _burn(address(this), amountInWstTAO); // We hold the wstTAO
        safeTransferTAO(key, amountInTAO); // Transfer the TAO from our contract
      }
    }

    // Mint the staked TAO
    if (stakeQueueTotal > 0) {
      for (uint256 i = 0; i < stakeQueue.size(); i++) {
        address key = stakeQueue.getKeyAtIndex(i);
        uint256 amount = _stakeQueue[key]; // Make sure to use the converted amount
        _mint(key, amount);
      }
    }

    // == Clear queues ==

    // Clear the stake queue
    stakeQueueTotal = 0;
    stakeQueue.clear();

    // Clear the unstake queue
    unstakeQueueTotal = 0;
    unstakeQueue.clear();
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

  function safeTransferTAO(address to, uint256 amount) private {
    (bool sent, bytes memory data) = to.call{value:amount}("");
    require(sent, "wstTAO: failed to send TAO");
  }

  function getCurrentStake(uint16 netuid) public view returns (uint256) {
    IGetStake getStake = IGetStake(IGETSTAKE_ADDRESS); // TODO: get current stake of contract somehow ...
    return getStake.getStake(_hotkey, address(this).ss58, netuid);
  }
}
