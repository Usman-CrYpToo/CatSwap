// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Test1 is ERC20{
    constructor()ERC20("Test1Erc20", "Test1"){
        _mint(msg.sender, 20000 * (10 ** 18));
    }
}