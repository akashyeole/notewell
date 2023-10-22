import React, { useContext, useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './User.css';
import applicationContext from '../Context/application/applicationContext'
import logoStaticLight from '../Images/logo_static_transparent_light.png';
import logoStaticDark from '../Images/logo_static_transparent_dark.png';
import TextInput from '../Components/Input/TextInput';
import CheckBox from '../Components/Input/CheckBox';
import InputErrorBox   from '../Components/InputErrorBox';

const User = () => {
    const { applicationState } = useContext(applicationContext);
    // const [submittable, setSubmittable]  = useState(false);
    const [formStatus, setFormStatus] = useState({error:[], loading: false, submittable: false});
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const decideButtonStatus = ()=>{
        if(email.current.value.length >= 1 && password.current.value.length >= 1){
            setFormStatus({...formStatus, submittable:true});
        }else{
            setFormStatus({...formStatus, submittable:false});
        }
    }

    const submitForSignIn = async (e)=>{
        e.preventDefault();
        if(!formStatus.submittable) return;
        setFormStatus({...formStatus, loading: true, error: []});
        let formResponse = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/${process.env.REACT_APP_API_VERSION}/auth/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email.current.value, password:password.current.value})
        })
        formResponse = await formResponse.json();
        const machuda = async () => {
            setTimeout(async()=>{
                if(!formResponse.authToken){
                    setFormStatus({...formStatus, loading: false, error: formResponse.errors.map((e) => {return e.msg})});
                }else{
                    setFormStatus({...formStatus, loading: false, error: []});
                    navigate('/');
                    // console.log(formResponse);
                }
            }, 3000);
        }

        await machuda();
    }

    return (
        <div className='page-container'>
            <form className='rounded-dialog user-sign ashadow' onSubmit={submitForSignIn} noValidate>
                <img src={applicationState.theme === 'dark' ? logoStaticDark :logoStaticLight} alt='logo' style={{widht: '10rem', height: '10rem'}} />
                <h1 className='dialog-msg'> Sign in with Mail ID</h1>
                <div className='sign-input-box '>
                    <TextInput type = 'email' label = 'Email' id = 'in-email' clist = {`upround ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {email} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>
                    <TextInput type = 'password' label = 'Password' id = 'in-password' clist = {`${formStatus.loading ? 'loading' : ''} downround submit ${formStatus.submittable ? 'senabled' : ''} ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {password} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>
                    <InputErrorBox errors = {formStatus.error}/>
                </div> 
                <CheckBox id = 'signinstatus' name = '' label='Keep me signed in' style = {{marginTop: "5.5rem", marginBottom: "1.5rem"}}/>
                <Link to='#' className = 'switchlabel'> Forgot password? </Link>
                <Link to='#' className = 'switchlabel'> Create account </Link>
            </form>
        </div>
    )
}

export default User