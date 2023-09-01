import React, { useContext, useState } from 'react'
import { Searchtoken } from '../export'
import style from './Herosection.module.css';
import setting from '../assets/setting.png';
import eth from '../assets/ethLogo.png';
import {Token} from '../export';
import { SwapTokenContext } from '../../context/SwapContext';
import { getPrice } from '../../context/fetchingPrice';
import loader from "../assets/loader.gif"

const Herosection = ({data}) => {
   const {account, singleSwap, getAllInfo, swapUpdatePrice} = useContext(SwapTokenContext);
   
   const [openSettings, setOpensettings] = useState(false);
   const [openTokenOne, setOpenTokenOne] = useState(false);
   const [openTokenTwo, setOpenTokenTwo] = useState(false);

  
   const [amountIn, setAmountIn] = useState(0);
   const [amoutOut, setAmountOut] = useState(0);
   
   const [ratio, setRatio] = useState(0);
   const [loading, setLoading] = useState(false)

   const [tokenOne, SetTokenOne] = useState({
      name : "",
       symbol : "",
       image : "",
       address : "",
       decimals : "",
       balance : "",
   });

   const [tokenTwo,setTokenTwo] = useState({
      name : "",
       symbol :"",
       image :"",
       address : "",
       decimals : "",
       balance : ""
   });
   
   // console.log("token In ::  ", tokenOne)
   // console.log("tokenOut :: ", tokenTwo)

   // const getAmountOutPrice = async(amountIn) => {
   //    try{
      
   //        const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
   //      const amountOut =await  getPrice(amountIn, poolAddress);
   //      setAmountOut(Number(amountOut.slice(0,16)));
   //      console.log(amountOut);
       
   // } catch(err){
   //     console.log(err);
   //     setAmountOut(0);
   //     setAmountIn(0);
   // }
  
   // }
  
   if(tokenOne.address){
       console.log(true);
   }else{
      console.log(false)
   }
   const getAmountOutPrice = async (amountIn) => {
      try{
    if(amountIn != "" && amountIn != "0" && tokenTwo.address != ""){
      setLoading(true);
      setRatio(0)
      const time = setTimeout(async() => {
         try{
         console.log(amountIn)
         const data = await swapUpdatePrice(amountIn, 1, 3, account,tokenOne, tokenTwo);
         console.log(data[1])
          setAmountOut(data[1]);
          setRatio(data[2]);
          setLoading(false)
         }catch(err){
            console.log(err);
         }
      }, 3000);
      
    }else{
       setAmountOut("0")
    }
   } catch(err){
      window.alert("internet is not connected")
   }
   }
  return (
     
            <div className={style.container}>
              
          {!openSettings && !openTokenOne && !openTokenTwo  && <div>  
           <div className={style.column}>
       
       <span className={style.head}>
       Swap
       </span>

       <span className={style.close}>
          <button onClick={() => {setOpensettings(true)}}>
            <img src={setting} alt="setting" width={20} height={20}/>
          </button>
       </span>

      </div>
    
       <div className={style.row}>

            <div className={style.TokenOne} >

                 
                        
                       
                         <input type="number" placeholder='0' disabled={tokenOne.address ? false : true}  onChange={ (event) => 
                             {
                              getAmountOutPrice(event.target.value);
                              setAmountIn(event.target.value);  
                           }
                        
                           }/>
                       

                       <button onClick={() =>{setOpenTokenOne(true)}}>
                               <img src={tokenOne.image || eth} alt="" width={30} height={30} />
                                <span className={style.tokenName}>
                                   {tokenOne.symbol || "select"}
                                </span>
                                <span className={style.amount}>{tokenOne ? tokenOne.balance.slice(0,5) : "0"}</span>
                         </button>
                       
                 

                   </div>

                   <div className={style.TokenOne} >
                 
                       
                         {/* <input type="number" placeholder='0' disabled={tokenTwo.address ? false : true} value={amoutOut}/>
                       */}
                        <div className={style.output}>{loading ? <img src={loader} alt="" width={50} height={50}/> : amoutOut}</div>
                         
                       
                         <button onClick={()=>{setOpenTokenTwo(true)}}>
                               <img src={tokenTwo.image || eth} alt="" width={30} height={30} />
                                <span className={style.tokenName}>
                                   {tokenTwo.symbol ||"select"}
                                </span>
                                <span className={style.amount}>{tokenTwo ? tokenTwo.balance.slice(0,5) : "0"}</span>
                         </button>
                   <div className={style.ratio}>
                      {
                      ratio ? `1 ${tokenTwo.symbol} = ${ratio} ${tokenOne.symbol}` : ""
                     }
                   </div>
            </div>

               <div className={style.swapButton}>
               <button onClick={()=> account ? singleSwap(tokenOne.address, tokenTwo.address,amountIn) : getAllInfo()}>{account ? <>Swap</> : <>connect wallet</>}</button>
             </div>
              
       </div> 
       </div>}
       
         {openSettings && <Token openSettings = {{setOpensettings}}/>}
     
            {openTokenOne && <Searchtoken setOpenToken={setOpenTokenOne} SetToken={SetTokenOne} account = {account}/>}
            {openTokenTwo && <Searchtoken  setOpenToken={setOpenTokenTwo} SetToken={setTokenTwo} account= {account} />}
       
       
      </div>
   
     
    

  )
}

export default Herosection