pragma solidity ^0.8.0;

contract SelfDestructAfter {
    uint public timestamp;

    constructor() {
        timestamp = block.timestamp + 30 days;
    }

    function checkAndDestroy() public {
        if (block.timestamp > timestamp) {
            selfdestruct(address(this));
        }
    }
}