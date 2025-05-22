pragma solidity ^0.8.0;

contract KillMe {
    function die() public {
        selfdestruct(address(this));
    }
}