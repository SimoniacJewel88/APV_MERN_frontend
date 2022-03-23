/**
 * Provider es de donde nace todo el estado Global de la aplicacion
 * la fuente de los datos del "state global"
 */

import { useState, useEffect, createContext } from "react";
import clienteAxios from '../config/axios.jsx';
//hacemos referencia a como se va a llamar el context del provider
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [ cargando, setCargando ] = useState(true);
    const [ auth, setAuth ] = useState({});

    const sumar = () => {
        console.log('sumando');
    }

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            // console.log(token);
            if(!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios.get('/veterinarios/perfil', config);

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                // Si hay un error ajustamos a un objeto vacio
                setAuth({});
            }
            setCargando(false); 
        }
        
        autenticarUsuario();

    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async (datos) => {
        // console.log(datos);
        const token = localStorage.getItem('token');
        // console.log(token);
        if(!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);

            // console.log(data);
            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            // console.log(error.response);
            return {
                msg: error.response.data.msg, error: true
            }
            
        }

    }

    const guardarPassword = async (datos) => {
        // console.log(datos);
        const token = localStorage.getItem('token');
        if(!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/actualizar-password`;

            const { data } = await clienteAxios.put(url, datos, config);
            // console.log(data);
            return {
                msg: data.msg
            }
        } catch (error) {
            return{
                msg: error.response.data.msg, error: true
            }
            // console.log(error.response.data.msg);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                sumar,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        > 
            {children}     
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
}

export default AuthContext;