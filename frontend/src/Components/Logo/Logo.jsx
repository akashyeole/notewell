import React, { useContext, useEffect } from 'react';
import "./Logo.css";
import applicationContext from '../../Context/application/applicationContext';


const Logo = (props) => {
  function logo_hover(){
    let act = document.getElementsByClassName("lord-logo");
    for(let i = 0; i < act.length; i++){
      act[i].style.transform = "scale(1.20)";
    }
    
  }
  
  function logo_not_hover(){
    let act = document.getElementsByClassName("lord-logo");
    for(let i = 0; i < act.length; i++){
      act[i].style.transform = "scale(1)";
    }
  }
  const { applicationState } = useContext(applicationContext);
  return (
    <div onMouseOver = {logo_hover} onMouseOut = {logo_not_hover} className = "logo-container d-flex align-items-center">
    {/* <lord-icon
      class = "lord-logo"
      src="https://cdn.lordicon.com/ppezgpha.json"
      trigger="hover"
      colors={applicationState.theme == "dark" ? "primary:#00EAF3,secondary:#0070f3" : "primary:#000000,secondary:#0070f3"}
      stroke="45"
      style={{width:props.iconSize, height:props.iconSize, transition:"all ease-in-out 300ms"}}>
    </lord-icon> */}
    <div className="d-flex" style={{fontSize: props.fontSize, color: applicationState.theme == "dark" ? "white" : "black"}}>
        <div className = "l-caps">N</div> <div className="ote l-small">ote</div> 
        <div className = "l-caps">W</div> <div className="ell l-small">ell</div>
    </div>
    </div>
  )
}

export default Logo