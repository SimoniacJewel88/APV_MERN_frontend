import { useState, useEffect } from 'react';

import Alerta from './Alerta.jsx';
import usePacientes from '../hooks/usePacientes.jsx';

const Formulario = () => {
    
    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState(''); 
    const [ sintomas, setSintomas ] = useState('');
    const [ id, setId ] = useState(null);

    const [ alerta, setAlerta ] = useState({});
    const [ alertita, setAlert ] = useState({});

    // lo que retorna el Provider es un hook
    const { guardarPaciente, paciente } = usePacientes();

    /** Le pasamos como dependencia/arreglo a
     * paciente, creo que para que haga efecto cafda vez que presionamos
     * el boton de Editar en en componente de paciente
     */
    useEffect(() => {
        // console.log('render o cambio paciente');
        /** Este es un nuevo operador, es como si paciente.nombre NO es undefined */
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar el formulario
        
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        } else {
            // console.log('estoy entrando en el else');
            setAlert({
                msg: 'Todos los campos estan completos', error: false
            });
        }
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
        setAlerta({
            msg: 'Guardado Correctamente'
        });
        setNombre(''),
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const { msg } = alerta;
    // const { mssg } = alertita;
    // console.log(alertita.msg);

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
        
            <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    {/* se pone htmlFor en lugar de for, porque for es palabra reservada de JS */}
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input 
                        type="text" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        id="nombre" 
                        placeholder="Nombre de la Mascota"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
        
                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</ label>
                    <input 
                        type="text" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        id="propietario" 
                        placeholder="Nombre de la Propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    {/* se pone htmlFor en lugar de for, porque for es palabra reservada de JS */}
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                    <input 
                        type="email" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        id="email" 
                        placeholder="Email del propietario"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
        
                <div className="mb-5">
                    {/* se pone htmlFor en lugar de for, porque for es palabra reservada de JS */}
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input 
                        type="date" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        id="fecha" 
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
        
                <div className="mb-5">
                    {/* se pone htmlFor en lugar de for, porque for es palabra reservada de JS */}
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        id="sintomas"
                        placeholder="Describe los Sintomas"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
        
                <input 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer w-full p-3 text-white uppercase font-bold transition-colors"
                    value={ id ? 'Guardar Cambios' : 'Agregar Paciente' }
        
                />
            </form>

            {msg && <Alerta alerta={alerta} />}
            {/* esto solo en una prueba para ver como "jalan" los alerts */}
            {alertita.msg && <Alerta alerta={alertita} />}
        </>

    )
}

export default Formulario