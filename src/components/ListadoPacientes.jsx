import usePacientes from "../hooks/usePacientes.jsx";
import Paciente from "./Paciente.jsx";

const ListadoPacientes = () => {

  const { pacientes } = usePacientes();
  // console.log(pacientes.length);

  return (
    <>
      { pacientes.length ? 
      (
        <>
          <h2 className="font-black text-center text-3xl">Listado Pacientes</h2>
          
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''} 
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map( paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente} 
            />
          ))}

        </>
      ) : 
      (
        <>
          <h2 className="font-black text-center text-3x1">No hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza Agregando Pacientes {''} 
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>        
      )}
    </>
  )
}

export default ListadoPacientes;