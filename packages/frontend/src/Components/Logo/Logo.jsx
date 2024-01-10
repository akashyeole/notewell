import React from 'react';
import "./Logo.css";
import { useApp } from '../../Hooks';


const Logo = (props) => {
  const { applicationState } = useApp();
  return (
    <div className = "logo-container d-flex align-items-center">
    <div className="d-flex" style={{fontSize: props.fontSize, color: applicationState.theme === "dark" ? "white" : "black"}}>
        <div className = "l-caps">N</div> <div className="ote l-small">ote</div> 
        <div className = "l-caps">W</div> <div className="ell l-small">ell</div>
    </div>
    </div>
  )
}

export default Logo