import {ethers} from "ethers";
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

import { QuoterAddress,AlchemyUrl ,factoryAddress } from "./Constant";
import { getAbi, getPoolImmutables } from "./priceHelper";

const provider = new ethers.providers.JsonRpcProvider(AlchemyUrl);

export const getPrice = async(inputAmount, poolAddress) => {
     
    const quoterInstance = new ethers.Contract(QuoterAddress, Quoter.abi, provider);
    const poolInstance = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);


    const poolData = await getPoolImmutables(poolInstance);
     console.log(poolData);
//    const token0Instance = new ethers.Contract(poolData.token0,await getAbi(poolData.token0), provider);
//    const token1Instance = new ethers.Contract(poolData.token1,await getAbi(poolData.token1), provider);
   
    const quoterOutput = await quoterInstance.quoteExactInputSingle.staticCall(
        poolData.token0,
        poolData.token1,
        poolData.fee,
        ethers.utils.parseUnits(inputAmount, 6).toString(),
        0 
    )

    return ethers.utils.formatEther(quoterOutput.toString(), 18);

}