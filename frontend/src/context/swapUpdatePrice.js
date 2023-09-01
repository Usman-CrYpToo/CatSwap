import {AlphaRouter} from "@uniswap/smart-order-router";
import {  Percent, CurrencyAmount,Token, TradeType } from "@uniswap/sdk-core";
import { BigNumber, ethers} from "ethers";
import { AlchemyUrl, IWETH9Address, DAIAddress,  } from "./Constant";


const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

// const tokenIn = new Token(
//    1,
//    "0x514910771af9ca656af840dff83e8264ecf986ca",
//    18,
//    "WETH",
//    "Wrapped ethereum"
//    );
   
//    const tokenOut = new Token(
//       1,
//       "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
//       18,
//       "DAI",
//       "Dai Token"
//       )
      
      export const swapUpdatePrice = async(inputAmount, slipage, deadLine, walletAddress, TokenIns, TokenOuts) => {
         try{
           const tokenIn = new Token(
              1,
              TokenIns.address,
              TokenIns.decimals,
              TokenIns.symbol,
              TokenIns.name
           )

           const tokenOut = new Token(
            1,
            TokenOuts.address,
            TokenOuts.decimals,
            TokenOuts.symbol,
            TokenOuts.name

           )

         //   console.log("token 1 :: ", tokenIn);
         //   console.log("token 2 ",tokenOut)
         const provider = new ethers.providers.JsonRpcProvider(AlchemyUrl)
      const router = new AlphaRouter({
         chainId : 1,
          provider : provider
      })
      
      console.log(provider);
      console.log(router);

     const options =     {
         
         slippageTolerance: new Percent(50, 10_000),
         deadline: Math.floor(Date.now() / 1000 + 1800),
         type: 1
      } 
     console.log("option :: ", options);

     const route = await router.route(
        CurrencyAmount.fromRawAmount(
            tokenIn,
        BigNumber.from(ethers.utils.parseUnits(inputAmount.toString(), TokenIns.decimals))
        ),
        tokenOut,
        TradeType.EXACT_INPUT,
        options
     )

     console.log(route);
    
      const Transaction = {
         // data : route.methodParameters?.calldata,
         // to : V3_SWAP_ROUTER_ADDRESS,
         // value : route.methodParameters.value,
         // from : walletAddress,
         // gasPrice : ethers.toBigInt(route.gasPriceWei),
         // gaslimit : ethers.hexlify(1000000)
      }
      console.log(inputAmount);
      const quoteAmountOut = route.quote.toFixed(6);
      const ratio = (inputAmount/quoteAmountOut).toFixed(3);
    
      console.log(quoteAmountOut, ratio);
      return [Transaction, quoteAmountOut, ratio]
   }catch(err){
      console.log(err);
   }
}