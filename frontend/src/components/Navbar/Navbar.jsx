import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import ethLogo from '../assets/ethLogo.png';
import Model from '../Model/Model.jsx';
import Styles from './Navbar.module.css';
import Tokenlist from '../Tokenlist/Tokenlist';
import { Link } from 'react-router-dom';

import { SwapTokenContext } from '../../context/SwapContext';

const Navbar = () => {
   
   const {swap, account,ether, networkConnect, WETH9, DAI, tokenData} = useContext(SwapTokenContext);

    const MenuItems = [
        {
            name : "Swap",
            link : "/",
        },
        {
            name : "Tokens",
            link : "/tokens",
        },
        {
            name : "Pools",
            link : "/"
        }
    ]

    const [openModel, setOpenModel] = useState(false);
    const[tokenList, openTokenList] = useState(false);
    const[connect, setConnect] = useState(false);
     useEffect(() => {
        account && setConnect(account);
     },[account])
  return (
    <div className={Styles.container}>
         <div className={Styles.header}>
              <div className={Styles.navbar}>
               
                  <img src={logo} alt="logo" width={50} height={50} />
                  <ul>
                   {
                      MenuItems.map((val, ind) => (
                           <li key={ind + 1}><Link to={val.link}>{val.name}</Link></li>
                      ))
                   }
                  </ul>
               
                 <div className={Styles.inp}>
                
                  <input type="text" placeholder='Search Token' />
                 
                  </div>

                  <div className={Styles.networks}>
                      
                      <img src={ethLogo} alt="networkLogo" width={30} height={30} />
                      { 
                        networkConnect.name ? <p>{networkConnect.name}</p> : <p>Network Name</p>
                      }
                  </div>
                   <div className={Styles.connect} >
                     <button onClick={()=> {connect ?  openTokenList(!tokenList) : setOpenModel(!openModel)}}>{account ? <>{account.slice(0,9)}..</> : "Connect"}</button>
                    </div>
                    
              </div>
         </div>
                <div className={Styles.model}>
                    {openModel && !connect &&
                        (<Model setOpenModel={{setOpenModel}}/>)
                     }
                 </div>

                 <div className={Styles.tokenList}>
                      {tokenList && connect &&
                         (<Tokenlist setOpenList={{openTokenList}}/>)
                      }
                 </div>
               
    </div>
  )
}

export default Navbar