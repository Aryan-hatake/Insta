import { useContext } from "react";
import { AuthContext } from "../store/auth.context";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    console.log(context)
    return context
}