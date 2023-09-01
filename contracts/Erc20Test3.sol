// SPDX-License-Identifier: GPL-2.0-or-Later
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Test3 is ERC20{
    constructor() ERC20("Erc20Test3", "Test3"){
        _mint(msg.sender, 10000 * (10 ** 18));
    }
}