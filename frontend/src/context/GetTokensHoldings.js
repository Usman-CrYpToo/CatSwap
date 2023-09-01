import axios from "axios";
import { AlchemyUrl } from "./Constant";


export const getTokensHoldings = async(address) => {
    const res = await axios.post(AlchemyUrl,{
         method : "alchemy_getTokenBalances",
         params : [`${address}`]
    })     

    return (res.data.result.tokenBalances);
}