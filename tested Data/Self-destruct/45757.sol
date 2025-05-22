pragma solidity ^0.8.0;

contract SelfDestructibleContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function destroyContract() public {
        require(msg.sender == owner, "Only owner can destroy");
        selfdestruct(owner);
    }
}