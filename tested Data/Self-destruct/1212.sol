pragma solidity ^0.8.0;

contract Vulnerable {
    function destroy() public {
        selfdestruct(msg.sender);
    }
}