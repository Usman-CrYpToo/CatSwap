import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {BootokenAddress,  BooTokenAbi} from "../context/Constant.js" ;
import {CatSwapAddress, catswapAbi} from "../context/Constant.js";
import {SingleSwapAddress,SingleSwapAbi} from "../context/Constant.js";
import {multihopswapAddress, multihopswapAbi} from "../context/Constant.js";
import {IWETH9Address, IWETH9Abi} from "../context/Constant.js";
import {DAIAddress, DAIAbi} from "../context/Constant.js";
import { getAbi } from "../context/priceHelper.js";
import IErc20 from "@openzeppelin/contracts/build/contracts/IERC20.json"
// for getting the first account connected to the dapp
export const checkIfWalletIsConnected = async () =>{
    try{
    if(!window.ethereum) return console.log("install metamask");
    const accounts = await window.ethereum.request({method : "eth_accounts"});
    return accounts[0];
    } catch(error){
       console.log(error);
    }
};

// sending the request to use the metamask;
export const connectWallet = async() => {
      try{
         if(!window.ethereum) return console.log("install metamask");
         const account = await window.ethereum.request({method : "eth_requestAccounts"});
         return account[0]; 
        
      } catch(error){
        console.log(error);
      }
}

// used to fetching the contract instance i.e so function of the contract can be called;
 const fetchContractInstance = async(contractAddress, abi, signer) => {
    try{
     const contract = new ethers.Contract(contractAddress, abi, signer);
     return contract;
    }catch(error){
        console.log(error);
    }
} 

// use to connect with the desired wallet ;
export const web3ModalProvider = async() => {
    try{
    if(window.ethereum){
     const web3modal = new Web3Modal();
     const connection  = await web3modal.connect();
     const provider = new ethers.providers.Web3Provider(connection);
     return provider;
    } else{
        alert("install metamask")
    }
    } catch(error){
        if(window.ethereum){
            console.log(error)
         window.location.reload();
        }
        
    }
}

// get contract instance 
export const getInstance = async (contractAddress, provider) => {
    try{
     const signer = await provider.getSigner();
     const instance = new ethers.Contract(contractAddress,catswapAbi, signer);
     return instance;
    }catch(err){
        console.log(err)
    }
}

// fetching the booToken instance;
export const BooTokenInstance = async (provider) => {
     try{
         const signer =await provider.getSigner();
         const contract =await fetchContractInstance(BootokenAddress, BooTokenAbi, signer);
         return contract;
     } catch(error){
          console.log(error);
     }
}

// fetching the catswap token instance;
export const CatSwapTokenInstance = async (provider) => {
     try{    
        const signer =await provider.getSigner();
         const contract =await fetchContractInstance(CatSwapAddress, catswapAbi, signer);
         return contract;
     } catch(error){
        console.log(error);
     }
}

// fetching the singleSwap contract instance;
export const singleSwapInstance = async (provider) => {
    try{
        const signer =await provider.getSigner();
        const contract = await fetchContractInstance(SingleSwapAddress, SingleSwapAbi, signer);
        return contract;
    } catch(error){
        console.log(error);
    }
}

// fetching the multihopswap contract instance;
export const multihopSwap= async (provider) => {
    try {
        const signer =await provider.getSigner();
         const contract = await fetchContractInstance(multihopswapAddress, multihopswapAbi, signer);
         return contract;
    } catch(error){
        console.log(error);
    }
}

// fetching the iweth contract instance;
export const IWETHInstance= async (provider) => {
    try{
    const signer =await provider.getSigner();
    const contract= await fetchContractInstance(IWETH9Address, IWETH9Abi, signer);
    return contract;
    } catch(error){
        console.log(error);
    }
}

// fetching the dai contract instance;
export const DAIInstance = async (provider) => {
    try{
    const signer =await provider.getSigner();
    const contract = await fetchContractInstance(DAIAddress, DAIAbi, signer);
    return contract;
    } catch(error){
        console.log(error);
    }
}