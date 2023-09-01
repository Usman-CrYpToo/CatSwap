import axios from "axios";
import { ethers } from "ethers";
import { etherscanApiUrl, etherscanApiKey} from "./Constant";


export const getAbi = async(ContractAddress) => {
     const res = await axios.get(etherscanApiUrl,{
         params : {
             module  : "contract",
             action : "getabi",
             address : ContractAddress,
            apikey : etherscanApiKey
         }
     })

     return (res.data.result);
}

export const getPoolImmutables = async(poolInstance) => {
      const immutables = {
         token0 : await poolInstance.token0(),
         token1 : await poolInstance.token1() ,
         fee : await poolInstance.fee() 
      }
      return immutables;
}