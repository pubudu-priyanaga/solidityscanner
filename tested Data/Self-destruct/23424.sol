pragma solidity ^0.8.0;

contract DestroyIfNotOwner {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function destroyIfNotOwner() public {
        if (msg.sender!= owner) {
            selfdestruct(address(this));
        }
    }
}