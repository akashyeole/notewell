import React, { useEffect, useState } from 'react';
import './HomeLogo.css'
import logoLight from '../../Images/logo_static_transparent_light.png';

const HomeLogo = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        window.addEventListener('load', (e)=>{
            setLoaded(true);
        })

        return ()=>{
            window.removeEventListener('load', (e)=>{});
        }
    })

    return(
        loaded && <div className="home-page-logo-container">
            <img src={logoLight} className='home-page-main-logo'/>
            {<div className="logo-item ashadow" id='lg1'>
                <lord-icon
                    class= 'lordlg'
                    src="https://cdn.lordicon.com/hifghmba.json"
                    trigger="loop"
                    delay='5000'
                    colors="primary:#e83a30,secondary:#3a3347,tertiary:#b4b4b4">
                </lord-icon>
            </div>}
            <div className="logo-item ashadow" id='lg2'>
                <lord-icon
                    class= 'lordlg'
                    src="https://cdn.lordicon.com/xahjzcuv.json"
                    trigger="loop"
                    delay='5000'
                    colors="primary:#eeaa66">
                </lord-icon>
            </div>
            <div className="logo-item ashadow" id='lg3'>
                <lord-icon
                    class= 'lordlg'
                    src="https://cdn.lordicon.com/ebkiwugo.json"
                    trigger="loop"
                    delay='5000'
                    colors="primary:#66a1ee,secondary:#ffffff,tertiary:#4cd934">
                </lord-icon>
            </div>
            <div className="logo-item ashadow" id='lg4'>
                <lord-icon
                    class= 'lordlg' 
                    src="https://cdn.lordicon.com/mnxemonz.json"
                    trigger="loop"
                    delay="5000">
                </lord-icon>
            </div>
            <div className="logo-item ashadow" id='lg5'>
                <lord-icon
                    class= 'lordlg'
                    src="https://cdn.lordicon.com/qwjfapmb.json"
                    state="hover-flutter"
                    trigger="loop"
                    delay='5000'
                    colors="primary:#e4e4e4,secondary:#4bb3fd,tertiary:#3a3347,quaternary:#c69cf4,quinary:#f9c9c0">
                </lord-icon>
            </div>
            <div className="logo-item ashadow" id='lg6'>
                <lord-icon
                    class= 'lordlg' 
                    src="https://cdn.lordicon.com/hntobqbr.json"
                    trigger="loop"
                    delay="5000"
                    state="morph-checked"
                    colors="primary:#3080e8,secondary:#ebe6ef,tertiary:#f24c00,quaternary:#eee966,quinary:#ee66aa">
                </lord-icon>
            </div>
            <div className="logo-item ashadow" id='lg7'>
                <lord-icon
                    class= 'lordlg'
                    src="https://cdn.lordicon.com/bgitlnnj.json"
                    trigger="loop"
                    delay='5000'
                    colors="primary:#66a1ee,secondary:#ebe6ef">
                </lord-icon>
            </div>
        </div>
    )
};

export default HomeLogo;