pragma solidity ^0.8.0;

contract SelfDestructContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function killContract() public {
        require(msg.sender == owner, "Only owner can destroy");
        selfdestruct(owner);
    }
}