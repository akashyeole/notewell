import React from 'react';
import './CheckBox.css';

const CheckBox = (props)=>{

    return(
        <div className='check-box' style = {props.style}>
            <input id = {props.id ? props.id : 'props.label'} name = {props.name ? props.name : props.label} value = {props.value ? props.value : props.label} type='checkbox'/>
            <label htmlFor={props.id ? props.id : 'props.label'} className=''>{props.label}</label>
        </div>
    );
}

export default CheckBox;
