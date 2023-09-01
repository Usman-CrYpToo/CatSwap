// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >= 0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken{
      ISwapRouter public immutable swapRouter;


     //  address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
     //  address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;  // these are hardcore address 
     //  address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;   // we will make it dynamic 


       uint24 public constant fees= 3000;

      constructor(){
          swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
      }

      //token0 = tokenIn like weth
      //token1 = tokenOut like Dai
      
      function swapExactInputSingle(address token0, address token1,uint256 amountIn) external returns(uint amountOut){

           TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amountIn);

           TransferHelper.safeApprove(token0, address(swapRouter), amountIn);

           ISwapRouter.ExactInputSingleParams memory param = ISwapRouter.ExactInputSingleParams({
                tokenIn : token0,
                tokenOut : token1,
                fee : fees,
                recipient : msg.sender,
                deadline : block.timestamp ,
                amountIn : amountIn,
                amountOutMinimum : 0,
                sqrtPriceLimitX96 : 0
           });

         return  swapRouter.exactInputSingle(param);
      }
        
        function swapExactOutputSingle(address token0, address token1, uint256 amountOut, uint amountInMaximum) external returns(uint amountIn){
            
            TransferHelper.safeTransferFrom(token0, msg.sender, address(this), amountInMaximum);

            TransferHelper.safeApprove(token0, address(swapRouter) , amountInMaximum);

            ISwapRouter.ExactOutputSingleParams memory param = ISwapRouter.ExactOutputSingleParams({
                 tokenIn :token0,
                 tokenOut :token1,
                 fee : fees,
                 recipient : msg.sender,
                 deadline : block.timestamp,
                 amountOut : amountOut,
                 amountInMaximum : amountInMaximum,
                 sqrtPriceLimitX96 : 0
            });

            uint _amountIn= swapRouter.exactOutputSingle(param);

            if(_amountIn < amountInMaximum){
                 TransferHelper.safeApprove(token0, address(swapRouter), 0);
                 TransferHelper.safeTransfer(token0, msg.sender, amountInMaximum - _amountIn);
            }
            return _amountIn;
        }

}