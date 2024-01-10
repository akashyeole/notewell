import { useContext } from "react";
import applicationContext from "../Context/application/applicationContext";

const useApp = () => {
    return useContext(applicationContext);
}

export default useApp;