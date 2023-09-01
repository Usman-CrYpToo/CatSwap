// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Test2 is ERC20{
    constructor() ERC20("Erc20Test2","Test2"){
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}
