import React, { useEffect, useState } from 'react'
import style from "./Tokens.module.css";
import AllTokens from './components/AllTokens/AllTokens';
import ethLogo from "./components/assets/ethLogo.png";
import searchimg from "./components/assets/search.png";

const Tokens = () => {
   const [allTokenList, setAllTokenList] = useState([
      {
        number : 1 ,
        image : ethLogo,
        name  : "Ether",
        symbol : "Eth",
        price :  "$12,999",
        change : "+ 234.3",
        tvl : "$795.3 M",
        volume : "200 M"
      },
      {
        number : 2,
        image : ethLogo,
        name : "dogecoin",
        symbol : "doge",
        price : "$1.4",
        change : "-12",
        tvl : "$100M",
        volume : "$10M"
      },
      {
        number : 3,
        image : ethLogo,
        name : "Cardano",
        symbol : "ada",
        price : "$2.3",
        change : "+ 12",
        tvl : "$400M",
        volume : "$200M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      },
      {
         number : 4,
         image : ethLogo ,
         name : "CatSwap",
         symbol : "Cat",
         price : "$4.55",
         change : "+12",
         tvl: "$600M",
         volume : "400M"
      }
   ]);

   const [copyTokenList, setCopyTokenList] = useState(allTokenList);
   const [search, setSearch] = useState("");
   const [searchItem, setSearchItem] = useState(search);

    const onHandleSearch = (value) =>{
        const filterToken = allTokenList.filter(({name}) =>{
           return (name.toLowerCase()).includes(value.toLowerCase());
        })

        if(filterToken.length == 0){
             setAllTokenList(copyTokenList);
        }
        else{
             setAllTokenList(filterToken);
        }
    }

    const onClearSearch = () =>{
         if(allTokenList.length && copyTokenList.length){
             setAllTokenList(copyTokenList);
         }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchItem);
        }, 800);
        return () => clearTimeout(timer);
    },[searchItem]);

    useEffect(() => {
       if(search){
         onHandleSearch(search);
       }else{
         onClearSearch();
       }
    },[search]);

  return (
    <div className={style.container}>
             <p className={style.heading}>Top Tokens On CatSwap</p>
    
         <div className={style.items}>

             <div className={style.box}>
                 <span>
                     <img src={ethLogo} width={40} height={40}/>
                 </span>
                  <p>Ethereum</p>
             </div>
              
               <div className={style.search}>
                   <span>
                    <img src={searchimg} width={20} height={20}/>
                    </span>
                    <input placeholder='Search Tokens' onChange={(event) => setSearchItem(event.target.value)}></input>
               </div>
         </div>
       
             <AllTokens allTokenList={allTokenList}/>
         
    </div>
  )
}

export default Tokens