import React from 'react'
import "./Logo.css"
import logo from "../../Images/logo_transparent.png";

const Logo = (props) => {
  return (
    <div  className = "logo-container d-flex gap-2 align-items-center">
    <img src = {logo} style = {{height: props.iconSize}}/>
            <div className="d-flex" style={{fontSize: props.fontSize}}>
                <div className = "l-caps">N</div> <div className="l-small">ote</div> 
                <div className = "l-caps">W</div> <div className="l-small">ell</div>
            </div>
    </div>
  )
}

export default Logo