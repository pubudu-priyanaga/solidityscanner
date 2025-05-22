pragma solidity ^0.8.0;

contract DestroyUnless {
    bool public condition;

    constructor() {
        condition = false;
    }

    function destroyUnless() public {
        if (!condition) {
            selfdestruct(address(this));
        }
    }
}