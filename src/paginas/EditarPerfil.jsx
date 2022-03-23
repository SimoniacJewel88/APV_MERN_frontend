// importaremos useState para generar un state mas local y no modificar el otro del Context
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav.jsx";
// para obtener informacion del State hay que utilizar el hook que hemos creado
import useAuth from "../hooks/useAuth.jsx";
import Alerta from "../components/Alerta.jsx";

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta ] = useState({});
    // console.log(auth);
    /** 
     * Este useEffect como dependencia tendra auth
     */
    useEffect(() => {
        setPerfil(auth);


    }, [auth]);
    // console.log(perfil);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, email } = perfil;
        if ([nombre, perfil].includes('')) {
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            });
            return; 
        }
        // Bloqueamos el codigo hasta obtener una respuesta
        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    };

    const { msg } = alerta;

    
    return (
      <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
            <span className="text-indigo-600 font bold">Informacion aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {msg && <Alerta
                    alerta = {alerta}
                />}

                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600" htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="nombre"
                            value={perfil.nombre || ''} //Con esto desaparece el warning
                            onChange={ (e) => {
                                /** Esto va a tomar una copia del perfil, luego busca la propiedad <e.target.name> y la sobreescribe, Sintaxis rara */
                                setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value 
                                });
                            }}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600" htmlFor="web">Sitio Web</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="web" //Gracias a esta propiedad setPerfil MAPEA el campo que corresponde a [e.target.name]
                            value={perfil.web || ''}                             onChange={ (e) => {
                                setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value 
                                });
                            }}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600" htmlFor="telefono">Telefono</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="telefono"
                            value={perfil.telefono || ''}                             onChange={ (e) => {
                                setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value 
                                });
                            }}
                        />
                    </div>

                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600" htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name="email"
                            value={perfil.email || ''}                             onChange={ (e) => {
                                setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value 
                                });
                            }}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />

                </form>
            </div>
        </div>
      </>
    )
}

export default EditarPerfil;