import React, { useContext } from 'react'
import { Navbar, Herosection} from './components/export'
import style from './app.module.css';
import {SwapTokenContext} from "./context/SwapContext.jsx";
import {BrowserRouter as Router,
         Routes,
         Route, 
       } from "react-router-dom"
import Token from './components/export';
import Tokens from './Tokens';
const App = () => {
   const {swap,account} = useContext(SwapTokenContext);
  return (
    <Router>

     <Navbar/>
      
      <Routes>
      <Route path='/' element={

        <div className={style.Herosection}>
     <Herosection  data={{account : "hey", tokenData : "data"}} /> 
     </div>

     }/>
      
      <Route path='/tokens' element={
        <div className={style.tokens}>
          <Tokens/>
          </div>
      }/>
      
     </Routes>
     </Router>
  )
}

export default App