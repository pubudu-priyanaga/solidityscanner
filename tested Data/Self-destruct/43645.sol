pragma solidity ^0.8.0;

contract SelfDestructUnless {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function destroyUnlessOwner() public {
        if (msg.sender!= owner) {
            selfdestruct(address(this));
        }
    }
}