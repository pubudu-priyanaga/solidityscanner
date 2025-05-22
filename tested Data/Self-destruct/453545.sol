pragma solidity ^0.8.0;

contract DestroyAfterDelay {
    uint public delay;

    constructor() {
        delay = 30 days;
    }

    function destroyAfterDelay() public {
        if (block.timestamp > block.timestamp - delay) {
            selfdestruct(address(this));
        }
    }
}