import { useContext } from "react";
import authContext from "../Context/authentication/authContext";

const useAuth = () => {
    return useContext(authContext);
}

export default useAuth;