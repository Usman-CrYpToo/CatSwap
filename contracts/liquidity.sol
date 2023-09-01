// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;

pragma abicoder v2;

import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';
import '@uniswap/v3-core/contracts/libraries/TickMath.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol';
import "hardhat/console.sol";

contract LiquidityExample is IERC721Receiver{
     address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
     address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

     uint24 public constant poolFee = 100;

    INonfungiblePositionManager public immutable nonfungiblePositionManager;
      
    constructor() {
         nonfungiblePositionManager =   INonfungiblePositionManager (0xC36442b4a4522E871399CD717aBDD847Ab11FE88);
    }

    struct Deposit{
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    mapping(uint256 => Deposit) public deposits;

       
    function _createDeposit(address owner, uint256 tokenId) internal{
        (
            ,
            ,
            address token0,
            address token1,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,
        ) = nonfungiblePositionManager.positions(tokenId);

        deposits[tokenId] = Deposit(owner, liquidity, token0, token1);
    }

    function onERC721Received(address operator,address , uint256 tokenId, bytes calldata) external override returns(bytes4){
        _createDeposit(operator, tokenId);
        return (this.onERC721Received.selector);
    }
    

    function mintNewPosition() external returns(uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1){
         
         uint256 amount0ToMint = 1000 ether;
         uint256 amount1ToMint = (1000 * (10 ** 6));

         TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager),amount0ToMint);
         TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), amount1ToMint);
            
         INonfungiblePositionManager.MintParams memory params =  INonfungiblePositionManager.MintParams({
            token0 : DAI,
            token1 : USDC,
            fee : poolFee,
            tickLower : TickMath.MIN_TICK,    //tick = (log(price) - log(BASE_PRICE)) / log(1.0001)
            tickUpper : TickMath.MAX_TICK,    // Price at Tick = BASE_PRICE * (tickSpacing ^ tick)
            amount0Desired: amount0ToMint,
            amount1Desired : amount1ToMint,
            amount0Min :0 ,
            amount1Min : 0,
            recipient : address(this),
            deadline :block.timestamp

         });

         (tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);

         console.log(
            "token Id :: ",tokenId,
            "liquidity :: ",liquidity
            );
         console.log(
            "amount0 :: ", amount0,
            "amount1 :: ",amount1
         );

          _createDeposit(msg.sender, tokenId);

          if(amount0 < amount0ToMint){
              TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager), 0);
               uint256 refund0 = amount0ToMint - amount0;
               TransferHelper.safeTransfer(DAI,msg.sender, refund0);
          }

          if(amount1 <amount1ToMint){
            TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), 0);
            uint256 refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(USDC,msg.sender,refund1);
          }
    }
   

    function _sendToOwner(uint256 tokenId, uint256 amount0, uint256 amount1) internal {
         address owner = deposits[tokenId].owner;
             
         address token0 = deposits[tokenId].token0;
         address token1 = deposits[tokenId].token1;

         TransferHelper.safeTransfer(token0, owner, amount0);
         TransferHelper.safeTransfer(token1, owner, amount1);
    }

   
    function collectAllFees(uint256 tokenId) external returns(uint256 amount0, uint amount1) {
        // nonfungiblePositionManager.safeTransferFrom(msg.sender, address(this), tokenId);

        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager.CollectParams({
            tokenId: tokenId,
            recipient : address(this),
            amount0Max : type(uint128).max,
            amount1Max : type(uint128).max
        }) ;

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        _sendToOwner(tokenId, amount0, amount1);

    }

    function decreaseLiquidityInHalf(uint256 tokenId) external returns(uint256 amount0, uint256 amount1){
          require(msg.sender == deposits[tokenId].owner,"Not the owner");

          uint128 Liquidity = deposits[tokenId].liquidity;
          uint128 halfLiquidity = Liquidity/2;

          INonfungiblePositionManager.DecreaseLiquidityParams memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
              tokenId : tokenId,
              liquidity : halfLiquidity,
              amount0Min : 0,
              amount1Min : 0,
              deadline : block.timestamp
          });

              (amount0, amount1)= nonfungiblePositionManager.decreaseLiquidity(params);

              _sendToOwner(tokenId, amount0, amount1);
    }
     
     function increaseLiquidityCurrentRange(uint256 tokenId, uint256 amountAdd0, uint256 amountAdd1) external returns(uint128 liquidity, uint256 amount0, uint256 amount1){

         TransferHelper.safeTransferFrom(deposits[tokenId].token0, msg.sender, address(this), amountAdd0);

         TransferHelper.safeTransferFrom(deposits[tokenId].token1, msg.sender, address(this), amountAdd1);

        TransferHelper.safeApprove(deposits[tokenId].token0, address(nonfungiblePositionManager), amountAdd0);

        TransferHelper.safeApprove(deposits[tokenId].token1, address(nonfungiblePositionManager), amountAdd1);

        INonfungiblePositionManager.IncreaseLiquidityParams memory params = INonfungiblePositionManager.IncreaseLiquidityParams({
          tokenId : tokenId,
          amount0Desired : amountAdd0,
          amount1Desired : amountAdd1,
          amount0Min : 0,
          amount1Min : 0,
          deadline : block.timestamp
        });

       (liquidity, amount0, amount1) =nonfungiblePositionManager.increaseLiquidity(params);


     }

     function getLiquidity(uint tokenId) external view returns(uint128 Liquidity) {
        (
          ,
          ,
          ,
          ,
          ,
          ,
          ,
          Liquidity,
          ,
          ,
          ,
        )= nonfungiblePositionManager.positions(tokenId);
        
     }

     function retriveNft(uint tokenId) external{
         require(deposits[tokenId].owner == msg.sender,"not the owner");

         nonfungiblePositionManager.safeTransferFrom(address(this), msg.sender, tokenId);

         delete deposits[tokenId];
     }
}