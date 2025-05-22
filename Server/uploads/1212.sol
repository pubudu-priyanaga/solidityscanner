pragma solidity ^0.8.0;

contract VulnerableContract {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(address payable attacker) public {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0; // This should be done first!

        (bool success, ) = attacker.call{value: amount}(""); // Reentrancy point
        require(success, "Transfer failed");
    }
}
