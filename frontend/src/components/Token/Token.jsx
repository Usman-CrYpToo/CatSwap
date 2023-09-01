import React, { useState } from 'react'
import style from './token.module.css';
import close from '../assets/close.png';
import lock from '../assets/lock.png';
import ToggleButton from '../button/ToggleButton';

const Token = ({openSettings}) => {
     const[auto, setAuto] = useState(true);
     const[on, setOn] = useState(false);
  return (
    <div className={style.container}>
     
    <div className={style.column}>
     
      <div className={style.head}>
        <p>Setting</p>
      </div>

      <div className={style.close}>
         <button onClick={() => { openSettings.setOpensettings(false) }}>
           <img src={close} alt="close" width={20} height={20}/>
         </button>
      </div>

      </div>  
       
        <div className={style.row}>

          <span className={style.heading}>
            Slippage Tolerance
            <img src={lock} alt="" width={10} height={10}/>
          </span>

            <div className={style.slipage}>
           
                 <button onClick={()=>{setAuto(!auto)}}>{auto ? "Auto" : "Custom"} </button>
                 
                      <input type="text" placeholder='0.10%' disabled={auto} />
               
            </div>
               
            <span className={style.heading}>
                  Transaction deadline
                <img src={lock} alt="" width={10} height={10}/>
          </span>

            <div className={style.slipage}>
                
                      <input type="text" placeholder='30' />
               
                     <button>minutes</button>
              
              
            </div>
           
           <div className={style.trans}>
            <span className={style.heading}>
                Interface Setting
          </span>
             <div className={style.transbtn}>
                 Transaction deadline<ToggleButton switchs={{on,setOn}}/>
             </div>
            
        </div>
        </div>

      </div> 
  )
}

export default Token