// src/services/userService.js
import api from './api'; // Importa la instancia de Axios

export const getUsers = async () => {
    try {
        const response = await api.get('/listar');
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const addUser = async (user) => {
    try {
        await api.post('/guardar', user);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateUser = async (id, user) => {
    try {
        await api.put(`/actualizar/${id}`, user);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        await api.delete(`/eliminar/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};
    