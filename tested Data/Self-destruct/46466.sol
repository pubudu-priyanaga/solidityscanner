pragma solidity ^0.8.0;

contract SelfDestructIf {
    bool public condition;

    constructor() {
        condition = true;
    }

    function destroyIf() public {
        if (condition) {
            selfdestruct(address(this));
        }
    }
}