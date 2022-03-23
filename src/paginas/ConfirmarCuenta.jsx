import { useEffect, useState } from 'react'; 
import { useParams, Link } from 'react-router-dom'
// import axios from 'axios';
import clienteAxios from '../config/axios.jsx';

import Alerta from '../components/Alerta.jsx';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params
  console.log(params);
  /** Colocamos un arreglo vacio como dependencia para 
   * que se ejecute una vez cuando el componente este listo */
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
        console.log(data);
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg});

      } catch (error) {
        setAlerta({msg: error.response.data.msg,  error: true});
        // console.log(error.response);
      }
      /** Cuando termine de cargar la pagina cargando = false */
      setCargando(false);
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a administrar tus {""} <span className="text-black">Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && <Alerta 
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Iniciar Sesión</Link>
        )}
        

      </div>
    </>
  )
}

export default ConfirmarCuenta