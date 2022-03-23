/** 
 * React te permite crear tus propios Hooks
 * por convencion inician con la palabra 'use<Nombre>'
 * crearemos uno para los pacientes (Tampoco entiendo muy bien esto)
 * Todo lo que este disponible en Pacientes provider lo vamos a extraer por medio 
 * de este custom Hook    :/ 
 */
 import { useContext } from "react"; // Sirve para extraer los datos del context
 import PacientesContext from "../context/PacientesProvider.jsx"; //El context del que se extraeran los datos
 
 const usePacientes = () => {
     return useContext(PacientesContext);
 } 
 
 export default usePacientes;