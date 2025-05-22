pragma solidity ^0.8.0;

contract SuicideContract {
    function kill() public {
        selfdestruct(address(this));
    }
}