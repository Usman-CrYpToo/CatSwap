import React, { useEffect } from 'react'
import style from "./AllTokens.module.css";
import exclamation from "../assets/exclamation.png";
const AllTokens = ({allTokenList}) => {
     useEffect(() =>{
         console.log(allTokenList) 
     },[])
  return (
      <div className={style.container}>
         <div className={style.header}>

             <div className={style.hide}>
               <p>#</p>
             </div>

             <div>
                 <p>Token name</p>
             </div>

             <div>
                <p>Price</p>
             </div>

             <div className={style.hide}>
                <p>Change</p> 
             </div>

             <div className={style.hide}>
                TVL
                <small>
                     <img src={exclamation} alt="" width={15} height={15}/>
                </small>
             </div>
             
             <div className={style.hide}>
                 Volume
                 <small>
                     <img src={exclamation} alt="" width={15} height={15}/>
                 </small>
             </div>
         </div>
          
           
                 {
                    allTokenList.map((val)=>(
                      <div className={style.All}>

                          <div className={style.hide}>
                            <p>{val.number}</p>
                          </div>
                          
                            <div className={style.data}>
                              <div>
                               <img src={val.image} alt="" width={40} height={40}/>
                               </div>

                                <div className={style.names}>
                                     <p className={style.tokenName}>{val.name}</p>
                                     <p className={style.symbol}>{val.symbol}</p>
                                </div>
                            </div>
                             
                            <div>
                              <p>{val.price}</p>
                            </div>

                            <div className={style.hide}>
                               <p> {val.change}</p>
                            </div>

                            <div className={style.hide}>
                                <p>{val.tvl}</p>
                            </div>

                            <div className={style.hide}>
                                <p>{val.volume}</p>
                            </div>
                      </div>
                    ))
                 }
          
      </div>
  )
}

export default AllTokens

// {
//     number : 1 ,
//     image : ethLogo,
//     name  : "Ether",
//     symbol : "Eth",
//     price :  "$12,999",
//     change : "+ 234.3",
//     tvl : "$795.3 M",
//     volume : "200 M"
//   },