pragma solidity ^0.8.0;

contract SelfDestructible {
    address[] public owners;

    constructor() {
        owners.push(msg.sender);
    }

    function destroy() public {
        require(owners.length > 0, "No owners");
        selfdestruct(owners[0]);
    }
}