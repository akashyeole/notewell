import React from "react";
import './InputErrorBox.css';
import errorIcon from '../Images/error-icon.png'

const InputErrorBox = (props)=>{
    return(
        <>
            {
                props.errors.length >= 1 && <div className='input-error-box ashadow'>
                    {
                        props.errors.map((e, i)=>{
                            return <label key = {i} className='error-text'>{e}</label>;
                        })
                    }
                    <div className="error-icon">
                        <img src={errorIcon}/>
                    </div>
                </div>
            }
        </>
    );
}

export default InputErrorBox;