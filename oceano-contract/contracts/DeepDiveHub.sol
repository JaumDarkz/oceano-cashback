// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC20 interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import reentrancy guard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DeepDiveHub is Ownable, ReentrancyGuard {
    IERC20 public token;

    // Add a boolean variable to track whether the contract is paused
    bool public withdrawEnabled = false;
    mapping(address => uint256) public balances;

    // Add indexed events for deposit, withdraw and admin withdraw

    event UserDeposit(address indexed grantee, uint256 amount);
    event Deposit(address indexed grantee, uint256 amount);
    event Withdraw(address indexed grantee, uint256 amount);
    event WithdrawToAdmin(address indexed grantee, uint256 amount);

    constructor (address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function userDeposit(uint256 amount, address grantee) external nonReentrant {
        require(amount > 0, "Amount should be greater than zero");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        balances[grantee] += amount;
        emit UserDeposit(grantee, amount);
    }

    function deposit(uint256 amount, address grantee) external onlyOwner nonReentrant {
        require(amount > 0, "Amount should be greater than zero");
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        balances[grantee] += amount;
        emit Deposit(grantee, amount);
    }

    // withraw should be callable only if the contract owner has enabled the withdraw feature
    function withdraw(uint256 amount) external nonReentrant {
        require(withdrawEnabled, "Withdraw is not enabled");
        require(amount > 0, "Amount should be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        require(token.transfer(msg.sender, amount), "Token transfer failed");
        emit Withdraw(msg.sender, amount);
    }

    function withdrawToAdmin(uint256 amount, address grantee) external onlyOwner nonReentrant {
        require(amount > 0, "Amount should be greater than zero");
        require(balances[grantee] >= amount, "Insufficient balance");

        balances[grantee] -= amount;
        require(token.transfer(msg.sender, amount), "Token transfer failed");
        emit WithdrawToAdmin(grantee, amount);
    }

    // Function to check the balance of a given address
    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }

    // Function to enable withdraw
    function enableWithdraw() external onlyOwner {
        withdrawEnabled = true;
    }

    // Function to disable withdraw
    function disableWithdraw() external onlyOwner {
        withdrawEnabled = false;
    }
}