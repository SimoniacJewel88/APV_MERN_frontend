import axios from 'axios';

// create Crea una URL de base
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;