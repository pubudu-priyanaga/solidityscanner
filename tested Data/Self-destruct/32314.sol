pragma solidity ^0.8.0;

contract Destroyable {
    function suicide() public {
        selfdestruct(address(this));
    }
}