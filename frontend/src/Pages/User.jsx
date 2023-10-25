import React, { useState, useRef, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import './User.css';
import { TextInput, CheckBox, InputErrorBox } from '../Components';
import { useApp, useAuth } from '../Hooks';
import logoStaticLight from '../Images/logo_static_transparent_light.png';
import logoStaticDark from '../Images/logo_static_transparent_dark.png';

const User = () => {
    // Hooks    
    const { applicationState } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location?.state?.from?.pathname || "/";
    const { setAuth } = useAuth();

    const [formStatus, setFormStatus] = useState({error:[], loading: false, submittable: false});
    const [pageStatus, setPageStatus] = useState(0);
    const inEmail = useRef();
    const inPassword = useRef();
    
    const upName = useRef();
    const upEmail = useRef();
    const upPassword = useRef();
    const upConfirmPassword = useRef();
    
    useEffect(()=>{
        if(pageStatus===0){
            inEmail.current.focus();
        }else{
            upName.current.focus();
        }
    }, [pageStatus]);
    
    const decideButtonStatus = ()=>{
        if(pageStatus === 0){
            if(inEmail.current.value.length >= 1 && inPassword.current.value.length >= 1){
                setFormStatus({...formStatus, submittable:true});
            }else{
                setFormStatus({...formStatus, submittable:false});
            }
        }else if(pageStatus === 1){
            if(upName.current.value.length >= 1 && upEmail.current.value.length >= 1 && upPassword.current.value.length >= 1 && upConfirmPassword.current.value.length >= 1){
                setFormStatus({...formStatus, submittable:true});
            }else{
                setFormStatus({...formStatus, submittable:false});
            }
        }
    };

    const submitForm = async (e)=>{
        e.preventDefault();
        if(!formStatus.submittable) return;
        setFormStatus({...formStatus, loading: true, error: []});
        if(pageStatus === 0){
            let formResponse = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/${process.env.REACT_APP_API_VERSION}/auth/loginuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: inEmail.current.value, password: inPassword.current.value})
            })
            formResponse = await formResponse.json();
            if(!formResponse.authToken){
                setFormStatus({...formStatus, loading: false, error: formResponse.errors.map((e) => {return e.msg})});
            }else{
                setFormStatus({...formStatus, loading: false, error: []});
                setAuth({token: formResponse.authToken});
                navigate(redirectTo, {replace: true});
            }
        }else if(pageStatus === 1){
            if(upPassword.current.value !== upConfirmPassword.current.value){
                setFormStatus({...formStatus, loading: false, error: ['Please confirm your passwords']});
                return;
            }
            let formResponse = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/${process.env.REACT_APP_API_VERSION}/auth/registeruser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: upName.current.value, email: upEmail.current.value, password: upPassword.current.value})
            })
            formResponse = await formResponse.json();
            if(!formResponse.authToken){
                setFormStatus({...formStatus, loading: false, error: formResponse.errors.map((e) => {return e.msg})});
            }else{
                setFormStatus({...formStatus, loading: false, error: []});
                setAuth({token: formResponse.authToken});
                navigate(redirectTo, {replace: true});
            }
        }
    };
    
    

    return (
        <div className='page-container'>
            {
                pageStatus===0 && <form className='rounded-dialog user-sign ashadow ' onSubmit={submitForm} noValidate>
                    <img src={applicationState.theme === 'dark' ? logoStaticDark :logoStaticLight} alt='logo' style={{widht: '10rem', height: '10rem'}} />
                    <h1 className='dialog-msg'> Sign in with Mail ID</h1>
                    <div className='sign-input-box '>
                        <TextInput type = 'email' label = 'Email' id = 'in-email' clist = {`upround ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {inEmail} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>
                        <TextInput type = 'password' label = 'Password' id = 'in-password' clist = {`${formStatus.loading ? 'loading' : ''} downround submit ${formStatus.submittable ? 'senabled' : ''} ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {inPassword} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>
                        <InputErrorBox errors = {formStatus.error}/>
                    </div> 
                    <CheckBox id = 'signinstatus' name = '' label='Keep me signed in' style = {{marginTop: "5.5rem", marginBottom: "1.5rem"}}/>
                    <Link to='#' className = 'switchlabel'> Forgot password? </Link>
                    <Link to='#' className = 'switchlabel' onClick={()=>{ setFormStatus({error:[], loading: false, submittable: false}); setPageStatus(pageStatus ^ 1);}}> Create account </Link>
                </form>
            }

            {
                pageStatus===1 && <form className='rounded-dialog user-sign ashadow ' onSubmit={submitForm} noValidate>
                <img src={applicationState.theme === 'dark' ? logoStaticDark :logoStaticLight} alt='logo' style={{widht: '10rem', height: '10rem'}} />
                <h1 className='dialog-msg'> Create account with Mail ID</h1>
                <div className='sign-input-box '>

                    <TextInput type = 'text' label = 'Name' id = 'up-name' clist = {`upround ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {upName} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>

                    <TextInput type = 'email' label = 'Email' id = 'up-email' clist = {`${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {upEmail} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>

                    <TextInput type = 'password' label = 'Password' id = 'up-password' clist = {`${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {upPassword} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>

                    <TextInput type = 'password' label = 'Re-type password' id = 'up-password' clist = {`${formStatus.loading ? 'loading' : ''} downround submit ${formStatus.submittable ? 'senabled' : ''} ${formStatus.error.length >= 1 ? 'error' : ''}`} reff = {upConfirmPassword} onchangefn = {decideButtonStatus} disabled = {formStatus.loading}/>
                    <InputErrorBox errors = {formStatus.error}/>
                </div> 
                <Link to='#' className = 'switchlabel' onClick={()=>{ setFormStatus({error:[], loading: false, submittable: false}); setPageStatus(pageStatus ^ 1);}} style = {{marginTop: "4.5rem"}}> Already have an account? </Link>
                <Link to='#' className = 'switchlabel'> Terms & Conditions </Link>
                </form>
            }

        </div>
    );
};

export default User