import { createContext, useState, useEffect } from 'react';

import clienteAxios from '../config/axios';

/**
 * Sigo sin entender muy bien como funciona esto
 * de los Context y Providers  :(
 */

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                // obtenemos el tokes pues ahi esta la informacion del veterinario
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();

    }, []);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        /** Si el paciente tiene un ID ya definido entonces es porque
         * lo estamos editando, caso contrario es nuevo paciente
         */
        if(paciente.id) {
            try {
                //La variable id la toma del state en Formulario.jsx
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                // console.log(data);
                /** Vamos a trabajar con el state de pacientes 
                 * pacienteState._id es lo que viene de parte de MongoDB
                */
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                /* Cuando es metodo POST se le pasa como tercer parametro el request con 
                la configuracion que tenga la authenticacion, en este caso  Bearer */ 
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
    
                /* Estos ...pacienteAlmacenado va a crear un nuevo objeto con lo que 
                no se tiene a la izquierda de los "..." */
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                console.log(pacienteAlmacenado);
    
                /* Se va a agregar un arreglo con una copia de lo que hay en pacientes,
                y se agregara un paciente nuevo al arreglo */
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        
    }
    /**
     * @param id tomara un id para identificar cual queremos editar 
     */
    const setEdicion = (paciente) => {
        setPaciente(paciente);

    }

    const eliminarPaciente = async (id) => {
        // console.log(id);
        const confirmar = confirm('¿Confirmas que quieres eliminar este paciente?');
        console.log(confirmar);
        /** Hacemos el llamado a la API y sincronizamos el state */
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                console.log(data);
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }            
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente

            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;

