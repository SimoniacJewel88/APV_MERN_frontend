/** 
 * React te permite crear tus propios Hooks
 * por convencion inician con la palabra 'use<Nombre>'
 */
import { useContext } from "react"; // Sirve para extraer los datos del context
import AuthContext from "../context/AuthProvider.jsx"; //El context del que se extraeran los datos

const useAuth = () => {
    return useContext(AuthContext);
} 

export default useAuth;