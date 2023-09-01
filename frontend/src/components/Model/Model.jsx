import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import  style from './Model.module.css';
import  close from '../assets/close.png';
import {SwapTokenContext}from '../../context/SwapContext';

const Model = ({setOpenModel}) => {
  const {getAllInfo} = useContext(SwapTokenContext);
    const WalletMenu = ["MetaMask", "Coinbase", "Wallet", "Wallet connect"];

    function Callwallet(ind){
      if(ind == 0){
          getAllInfo();
      }
    }
    

  return (
    
    <div className={style.container}>
     
      <div className={style.column}>
       
        <div className={style.head}>
          <p>Connect a Wallet</p>
        </div>

        <div className={style.close}>
           <button onClick={() => {setOpenModel.setOpenModel(false)}}>
             <img src={close} alt="close" width={20} height={20}/>
           </button>
        </div>

        </div>

        
        <div className={style.allWallets}>
          {
            WalletMenu.map((val,ind) => (
             
               <button key={ind} onClick={() => Callwallet(ind)}  >{val}</button>
             
            ))
          }
          <div className={style.condition}>
            <p>
            By connecting a wallet, you agree to CatSwap' Terms of Service and consent to its Privacy Policy.
            </p>
          </div>
          </div>
        


      </div>
    
  )
}

export default Model