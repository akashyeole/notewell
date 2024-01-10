import AuthContext from "./authContext";
import { useState } from "react";

const AuthState = (props)=>{
    
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;