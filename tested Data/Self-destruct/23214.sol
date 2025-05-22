pragma solidity ^0.8.0;

contract SelfDestruct {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function kill() public {
        require(msg.sender == owner, "Only owner can destroy");
        selfdestruct(owner);
    }
}