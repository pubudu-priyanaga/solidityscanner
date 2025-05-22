pragma solidity ^0.8.0;

contract KillMeMaybe {
    function maybeDie() public {
        if (block.timestamp > 1643723400) {
            selfdestruct(address(this));
        }
    }
}