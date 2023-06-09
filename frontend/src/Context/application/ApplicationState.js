import ApplicationContext from "./applicationContext";
import { useEffect, useState } from "react";

const ApplicationState  = (props)=>{

    let currState = {
        theme: "dark"
    };

    const [applicationState, setAppState] = useState(currState);

    useEffect(()=>{
        let link = document.querySelector("link")
        link.href = `./logo_static_${applicationState.theme}.png`;
        // Nav
        const nav = document.querySelector(".nav-container");
        nav.style.background = (applicationState.theme ==="dark" ? "rgba(0,0,0, 0.85)" : "rgba(255, 255, 255, 0.8)");
        // Body
        const body = document.querySelector("body")
        body.classList.add(applicationState.theme);
        if(applicationState.theme === 'dark') body.classList.remove('light');
        else body.classList.remove('dark');
        body.style.backgroundColor = (applicationState.theme ==="dark" ? "black" : "white")

    }, [applicationState.theme])

    const updateAppState = (updatedAppState)=>{
        setAppState(updatedAppState);
    };

    return (
        <ApplicationContext.Provider value={{applicationState, updateAppState}}>
            {props.children}
        </ApplicationContext.Provider>
    )
}

export default ApplicationState;