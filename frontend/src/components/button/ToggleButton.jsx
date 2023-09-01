import React from 'react'
import style from './Togglebutton.module.css'
const ToggleButton = ({switchs}) => {
  return (
    <div className={style.button}>
        <label className={style.toggle}>
    <input type="checkbox"  onChange={() => {switchs.setOn(!switchs.on)}}/>
    <span className={style.slider}></span>
  </label>
    </div>
  )
}

export default ToggleButton