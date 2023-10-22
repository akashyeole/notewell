import './TextInput.css';
import React, { useState } from 'react';


const TextInput = (props) => {
    let [value, setValue] = useState('')
    if(props.value){
        value = props.value.value;
        setValue = props.value.setValue;
    }

    const handleChange = (e)=>{
        setValue(e.target.value);
        props.onchangefn();
    }

    return (
        <div className={`text-input ${props.clist}`}>
            <input ref = {props.reff} type={props.type} id={props.id ? props.id : ''} value = {value} onChange={handleChange} style = {{paddingRight : `${props.type === 'password' ? '2.4rem' : '1.2rem'}`}} formNoValidate disabled = {props.disabled}/>
            <label className = {value && 'filled'} htmlFor={props.id ? props.id : ''}>{props.label}</label>
            <button tabIndex = {`${props.clist.indexOf('senabled') === -1 ? "-1" : "auto"}`} type = 'submit' to='/' className='submit-icon-link' disabled = {props.loading}/>
        </div>
    )
}

export default TextInput;