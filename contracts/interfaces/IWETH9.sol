// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;

interface IWETH9{
    function deposit() external payable ;
    
    function widthdraw() external ;

    function totalSupply() external view returns(uint);

    function balanceOf(address account) external view returns(uint);

    function transfer(address to, uint256 value) external returns(bool);

    function allowance(address owner, address spender) external returns(uint256);

    function approve(address spender, uint256 value) external returns(bool);

    function transferFrom(address from, address to, uint256 value) external returns(bool);
    
    event Transfer(address indexed from, address indexed to, uint256 indexed value);

    event Approval(address indexed owner, address indexed spender, uint256 indexed value);
}