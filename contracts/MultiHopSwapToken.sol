// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract MultiHopSwapers{
     address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
     address public constant WETH9 =0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 ;
     address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
      
     uint24 public constant fees = 3000;
     ISwapRouter public iswapRouter;

     constructor(){
           iswapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
     }


     function swapExactInputMultihop(uint256 amountIn) external returns(uint256 amountOut){

          TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);

          TransferHelper.safeApprove(WETH9, address(iswapRouter), amountIn);

           ISwapRouter.ExactInputParams memory params =   ISwapRouter.ExactInputParams({
               path : abi.encodePacked(
                  WETH9,
                  fees,
                  USDC,
                  uint24(100),
                  DAI
               ),

               recipient : msg.sender,
               deadline : block.timestamp ,
               amountIn : amountIn,
               amountOutMinimum : 0
           });

          uint256 amountOutDAI = iswapRouter.exactInput(params);
          return amountOutDAI;
     }
   
     function swapExactOutputMultihop (uint256 amountOut, uint256 amountInMaximum) external returns(uint amountIn){
        
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);

        TransferHelper.safeApprove(WETH9, address(iswapRouter), amountInMaximum);

         ISwapRouter.ExactOutputParams memory params = ISwapRouter.ExactOutputParams({
             path : abi.encodePacked(
                DAI,
                uint24(100),
                USDC,
                fees,
                WETH9
             ),

             recipient : msg.sender,
             deadline : block.timestamp,
             amountOut : amountOut,
             amountInMaximum : amountInMaximum
         });

        uint256 amountInWETH = iswapRouter.exactOutput(params);
         
        if(amountInWETH < amountInMaximum){
            TransferHelper.safeApprove(WETH9,address(iswapRouter),0);
          
            TransferHelper.safeTransferFrom(WETH9, address(this), msg.sender, amountInMaximum - amountInWETH);
        }
        return amountInWETH;
     }
    
}