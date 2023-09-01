import React, { useContext, useState } from 'react'
import style from './Searchtoken.module.css';
import close from '../assets/close.png';
import search from '../assets/search.png';
import tokenList from "../../context/tokenList.json";
import { getAbi } from '../../context/priceHelper';
import { AlchemyUrl } from '../../context/Constant';
import { Contract, ethers } from 'ethers';
import { SwapTokenContext } from '../../context/SwapContext';

const Searchtoken = ({setOpenToken, SetToken, account}) => {
   const[active, setActive] = useState(-1);
   const {providers} = useContext(SwapTokenContext); 
   // const tokens = [
   //  {
   //     name:"dog",
   //     image: setting
   //  },
   //  {
   //     name:"grt",
   //     image: setting
   //  },
   //  {
   //     name:"ada",
   //     image: setting
   //  },
   //  {
   //     name:"dog",
   //     image: setting
   //  },
 
   //  {
   //     name:"dog",
   //     image: setting
   //  },
 
   //  {
   //     name:"dog",
   //     image: setting
   //  },
 
 
  

 
   // ]
     
     console.log(tokenList);

 async function apply(ind,val){
    try{

    setActive(ind);
    let format = "";
    if(providers){
      const instance = new Contract(val.address,["function balanceOf(address) view returns(uint256)"], providers); 
      const bal =await instance.balanceOf(account);
      format = ethers.utils.formatUnits(bal, val.decimals)
    }
      SetToken({name : val.name ,symbol : val.symbol, image : val.logoURI, address : val.address, decimals : val.decimals, balance: format });
      const timeoutId = setTimeout(() => {
         setOpenToken(false)
      }, 900); // Change this to 2000 for a 2-second delay
      return () => clearTimeout(timeoutId);
 
       // Clean up the timeout to avoid memory leaks
      } catch(err){
          console.log(err);
      }
   }
  return (
    <div className={style.container}>
         <div className={style.column}>
     
     <div className={style.head}>
       <p>Select The Token</p>
     </div>

     <div className={style.close}>
        <button onClick={() => {setOpenToken(false) }}>
          <img src={close} alt="close" width={20} height={20}/>
        </button>
     </div>

     </div>  
       <div className={style.searchToken}>
           <img src={search} alt="search" width={20} height={20} />
           <input type="text" placeholder='Search name or token address'/>
       </div>
         
        <div className={style.allTokens}>
           {/* {
             tokens.map((val,ind) =>(
            
                <button 
                   key={ind}
                   style={{background: ind === active ? '#CFF80B' : 'transparent', color: ind === active ? '#1E1E1E' : '#FFFFFF' }}
                   onClick={()=>{apply(ind,val)}}
                >
                    <img src={val.image} alt="" width={20} height={20} />
                    <span>{val.name}</span>
                    </button>
            
             ))

           } */}

           {
                  tokenList.map((val,ind) =>(
            
                     <button 
                        key={ind}
                        style={{background: ind === active ? '#CFF80B' : 'transparent', color: ind === active ? '#1E1E1E' : '#FFFFFF' }}
                        onClick={()=>{apply(ind,val)}}
                     >
                         <img src={val.logoURI} alt="" width={20} height={20} />
                         <span>{val.symbol}</span>
                         </button>
                 
                  ))
           }
        </div>

    </div>
  )
}

export default Searchtoken