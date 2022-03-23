/**
 * BrowserRouter - todo esta rodeado por este coso
 * Routes - te permite agrupar diferentes rutas
 * Route - para una ruta en especifico
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout.jsx';
import RutaProtegida from "./layout/RutaProtegida.jsx";

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx';
import EditarPerfil from './paginas/EditarPerfil.jsx';
import CambiarPassword from './paginas/CambiarPassword.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { PacientesProvider } from './context/PacientesProvider.jsx'

function App() {

  // console.log(import.meta.env.VITE_BACKEND_URL);
  // console.log(import.meta.env.VITE_IMAGENES_URL);

  return (
    <BrowserRouter>
      <AuthProvider>

        <PacientesProvider>

          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              {/* Ya no es necesario poner la "/" porque la toma del
                  route Principal del Layout */}
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>
                  {/* Aqui van las rutas protegidas */}
            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path='perfil' element={<EditarPerfil/>} />
              <Route path='cambiar-password' element={<CambiarPassword/>} />
            </Route>
          </Routes>

        </PacientesProvider>
        
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
