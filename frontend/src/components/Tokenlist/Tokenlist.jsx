import React, { useContext } from 'react'
import style from './tokenlist.module.css';
import  close  from '../assets/close.png';
import { SwapTokenContext } from '../../context/SwapContext'; 
import { ethers } from 'ethers';


const Tokenlist = ({setOpenList}) => {
    const {tokenData} = useContext(SwapTokenContext);
   
    const filtered = tokenData.filter((val,ind) => val.balance > 0 && val.decimals > 0n)   ;
  
  return (
    <div className={style.container}>
          
      <span className={style.column}>
       
       <span className={style.head}>
         Your Token List
       </span>

       <span className={style.close}>
          <button onClick={() => {setOpenList.openTokenList(false)}}>
            <img src={close} alt="close" width={20} height={20}/>
          </button>
       </span>

       </span>


        <div className={style.allTokens}>
            {
                filtered.map(( val,ind) =>(
                <div className={style.line} key={ind} >                  
                 <div className={style.box}>
                        <span className={style.symbol}>
                             {val.symbol}
                        </span>

                        <span className={style.amount}>
                             {(ethers.utils.formatUnits(val.balance,val.decimals)).slice(0,6)}
                        </span>

                        <span className={style.tokenName}>
                            {(val.name).slice(0,7)}..
                        </span>

                       <br />
                       </div>

                               <hr className={style.customhr}/>
                       </div>

                
                ))
            }
        </div>
    </div>
  )
}

export default Tokenlist