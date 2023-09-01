import Bootoken from "../contracts/contracts/Erc20boo.sol/boo.json";
import CatSwap from "../contracts/contracts/Erc20Cat.sol/CatSwap.json";
import singleSwap from "../contracts/contracts/SwapToken.sol/SingleSwapToken.json";
import multiSwap from "../contracts/contracts/MultiHopSwapToken.sol/MultiHopSwapers.json";
import IWETH9 from "../contracts/contracts/interfaces/IWETH9.sol/IWETH9.json";



export const BootokenAddress = "0xC220Ed128102d888af857d137a54b9B7573A41b2";
export const BooTokenAbi = Bootoken.abi;

export const CatSwapAddress = "0xfaE849108F2A63Abe3BaB17E21Be077d07e7a9A2";
export const catswapAbi = CatSwap.abi;

export const SingleSwapAddress = "0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5";
export const SingleSwapAbi = singleSwap.abi;

export const multihopswapAddress = "0xce830DA8667097BB491A70da268b76a081211814";
export const multihopswapAbi = multiSwap.abi;

export const IWETH9Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETH9Abi = IWETH9.abi;

export const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const DAIAbi = IWETH9.abi;

export  const AlchemyUrl = "https://eth-mainnet.g.alchemy.com/v2/Y-Ra4UY2CUMTVUzfwwd8U8RU7jiJoARj";

export const etherscanApiUrl = "https://api.etherscan.io/api";
export const etherscanApiKey = "PJNGIM9DER94ZJJSPZXPAQQKW92F7FGWG1";

export const QuoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"
export const factoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984";



// BooToken contract address ::  0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798

// CatSwap Token Contract address ::  0xc1EeD9232A0A44c2463ACB83698c162966FBc78d

// SingleSwapToken contract address ::  0xC220Ed128102d888af857d137a54b9B7573A41b2

// MultiHopSwap contract address ::  0xfaE849108F2A63Abe3BaB17E21Be077d07e7a9A2