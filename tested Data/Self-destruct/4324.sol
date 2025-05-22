pragma solidity ^0.8.0;

contract DestroyMe {
    function selfDestruct() public {
        selfdestruct(address(this));
    }
}