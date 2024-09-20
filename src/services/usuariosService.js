// src/services/servicioService.js
import api from './api';


// Obtener todos los usuarios
export const fetchUsuarios = async () => {
    try {
        const response = await api.get('usuario/listar');
        return response.data.list;
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        throw error;
    }
};


// obtener roles
export const fetchRoles = async () => {
    try {
        const response = await api.get('rol/listar');
        return response.data.list;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

export const fetchUsuarioById = async (id) => {
    try {
        const response = await api.get(`usuario/listar/${id}`);
        return response.data.Lista;
    } catch (error) {
        console.error(`Error fetching usuario with ID ${id}:`, error);
        throw error;
    }
};

// Agregar un nuevo servicio
export const createUsuario = async (usuario) => {
    try {
        const response = await api.post('usuario/guardar', usuario);
        return response.data.Usuario;
    } catch (error) {
        console.error('Error creating usuario:', error);
        throw error;
    }
};


// Actualizar un servicio existente
export const updateUsuario = async (id, usuario) => {
    try {
        const response = await api.put(`usuario/actualizar/${id}`, usuario);
        return response.data.Usuario;
    } catch (error) {
        console.error(`Error updating usuario with ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un servicio existente
export const deleteUsuario = async (id) => {
    try {
        const response = await api.put(`usuario/eliminar/${id}`);
        return response.data.Usuario;
    } catch (error) {
        console.error(`Error marking usuario as inactive with ID ${id}:`, error);
        throw error;
    }
};

// Obtener usuarios con búsqueda y paginación
export const fetchUsuariosWithFilter = async (searchTerm = '', page = 0, size = 10) => {
    try {
        const response = await api.get('servicio/listarPaginado', {
            params: {
                q: searchTerm,
                page: page,
                size: size
            }
        });
        return response.data.Lista; // Ajusta esto según el formato de respuesta del backend
    } catch (error) {
        console.error('Error fetching usuarios with filter:', error);
        throw error;
    }
}