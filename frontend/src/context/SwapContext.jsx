import React from 'react'
 import { useEffect, useState } from 'react';
 import Web3Modal from "web3modal";
  import {ethers} from "ethers";
 //import internal 
import{
    checkIfWalletIsConnected,
    connectWallet,
    web3ModalProvider,
    BooTokenInstance,
    CatSwapTokenInstance,
    singleSwapInstance ,
    multihopSwap,
    IWETHInstance,
    DAIInstance
} from "../utils/AppFeatures.js"


import { getTokensHoldings } from './GetTokensHoldings.js';

import {BootokenAddress ,CatSwapAddress ,catswapAbi} from "./Constant.js"

import { getPrice } from './fetchingPrice.js';

import { swapUpdatePrice } from './swapUpdatePrice.js';
import { getInstance } from '../utils/AppFeatures.js';

export const SwapTokenContext = React.createContext();

  

 const SwapContext = ({children}) => {

  // all the data state variable;
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [WETH9, setWETH9] = useState("");
    const [DAI, setDai] = useState("");
    const [providers, setProviders] = useState("");

  // this state variable contain all the token contract address;
    // const [tokenAdd, setTokenAdd] = useState([getTokensHoldings()]); 
    
   // this store the token data like "name, symbol, balance of the user" of token which are present in tokenAdd state variable;
    const [tokenData, setTokenData] = useState([
      {
        name : "",
        symbol : "",
        balance : 0n
      }
    ]);
    
    const swap = "this is swap context";
   
    //check is intailized to stop useEffect running twice;
    let [check, setCheck] = useState(true);
    
    const getAllInfo = async () => {
      try{
     
        //check =false so that it stop the useEffect calling function twice;
         check = false;

       // getting the provider 
       const provider = await web3ModalProvider();
       setProviders(provider);

       //getting account which is connected;
       const accounts = await checkIfWalletIsConnected();
       setAccount(accounts);
      
       //getting account balance ;
         const balance = await provider.getBalance(accounts);
         setEther(ethers.utils.formatEther(balance));
        
      //getting the network from which dapp is connected;
       const network = await provider.getNetwork();
       setNetworkConnect(network);

      //getting the instance of weth9 token and then the balance of the user;
       const weth9 = await IWETHInstance(provider);
       const weth9Bal = await weth9.balanceOf(accounts);
       setWETH9(ethers.utils.formatEther(weth9Bal));

      //getting the instance of dai token and then the balance of the user;
      const dai = await DAIInstance(provider);
      const daiBal = await dai.balanceOf(accounts);
      setDai(ethers.utils.formatEther(daiBal));
       
      // now getting the tokenData of the tokens in the tokenAdd variable using map;
      const signer = await provider.getSigner();
      const tokendatas = [];
      const tokenAdd = await getTokensHoldings(accounts);
       console.log(tokenAdd)
     tokenAdd.map(async (val,ind) => {
          try{
             const instance = new ethers.Contract(val.contractAddress, catswapAbi, signer);
          
             tokendatas.push({
                name :  await instance.name(),
                symbol : await instance.symbol(),
                balance : ethers.BigNumber.from((val.tokenBalance)),
                decimals : await instance.decimals()
             })
             setTokenData([...tokendatas]);
             console.log(tokendatas)
          }catch(error){
             console.log(error);
             
          };
       });
     
 
      } catch(error){
         console.log(error);
      }
      
    }
    
    useEffect(()=>{
       if(window.ethereum){
         window.ethereum.on("accountsChanged",async ()=>{
           await getAllInfo();
           console.log("in accountchanged")
         })

         return () =>{
             window.ethereum.removeAllListeners('accountsChanged');
         }
       }
    },[])
    
   
    //   if(window.ethereum){
    //     window.ethereum.on("accountsChanged", getAllInfo)
    //  //  return () => {
    //     // if (window.ethereum) {
    //     //   window.ethereum.removeAllListeners('accountsChanged');
    //    // }
    //  // }
    // }
  
     
     useEffect( ()=>{
     async function call() {
       if(window.ethereum){
                const account = await window.ethereum.request({method : "eth_accounts"});
               if(account.length !== 0){
              check && await getAllInfo();
                  console.log("inCall",account)
               }
       }
      } 
        call();
     },[])
  

     const singleSwap = async (token0, token1, amountIn) => {
      try {
        if(amountIn != "" && amountIn != "0"){
          const instanceOfswap = await singleSwapInstance(providers);
          // const weth9 = await IWETHInstance(providers);
          // const dai = await DAIInstance(providers);
          // console.log(token0);
          // console.log(token1);
          // console.log(instanceOfswap);
          // console.log(weth9)
          const weth9 = await getInstance(token0, providers);
          const dai = await getInstance(token1, providers);
          const amount  = amountIn
          console.log(instanceOfswap);
          console.log(weth9);
          console.log(dai)
          // const value = {value: ethers.utils.parseEther(amount)};
          // // console.log(value)
          // await weth9.deposit(value);
          console.log(amount)
          // console.log(ethers.utils.formatUnits(await weth9.balanceOf(account),(await weth9.decimals()).toString()));
          // console.log((await weth9.decimals()).toString());

      const appr=    await weth9.approve(instanceOfswap.address, ethers.utils.parseUnits(amount,(await weth9.decimals()).toString()),{
             gasLimit: 300000,
             gasPrice : 16 * (10 ** 9),
            //  maxPriorityFeePerGas : 2 * (10 ** 9)
          });
          console.log(instanceOfswap);
        await appr.wait();
          const tx = await instanceOfswap.swapExactInputSingle(token0, token1,ethers.utils.parseUnits(amount,(await weth9.decimals()).toString()),{
             gasLimit : 5000000,
             gasPrice : 16 * (10 ** 9),
            //  maxPriorityFeePerGas: 2 * (10 ** 9)
          });

          await tx.wait();

        
          
          // console.log(instanceOfswap.address)
          // console.log(ethers.utils.formatEther(await dai.balanceOf(account)));
        }
        } catch(error){
           console.log(error);
        }
     }

  return (

    <SwapTokenContext.Provider value={{swap, account,ether, networkConnect, WETH9, DAI, tokenData, getAllInfo,providers, singleSwap,getPrice, swapUpdatePrice}}>
        {children}       
        <button onClick={singleSwap}>singleSwap</button>
    </SwapTokenContext.Provider>
  )
}

export default SwapContext