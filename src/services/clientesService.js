// src/services/servicioService.js
import api from './api';

// Obtener todos los registros
export const fetchClientes = async () => {
    try {
        const response = await api.get('cliente/listar');
        return response.data.list;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw error;
    }
};

export const fetchClienteById = async (id) => {
    try {
        const response = await api.get(`cliente/listar/${id}`);
        return response.data.Lista;
    } catch (error) {
        console.error(`Error fetching servicio with ID ${id}:`, error);
        throw error;
    }
};

// Agregar un nuevo servicio
export const createCliente = async (cliente) => {
    try {
        const response = await api.post('cliente/guardar', cliente);
        return response.data.cliente;
    } catch (error) {
        console.error('Error creating servicio:', error);
        throw error;
    }
};


// Actualizar un servicio existente
export const updateCliente = async (id, cliente) => {
    try {
        const response = await api.put(`cliente/editar/${id}`, cliente);
        return response.data.cliente;
    } catch (error) {
        console.error(`Error updating servicio with ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un servicio existente
export const deleteCliente = async (id) => {
    try {
        const response = await api.put(`cliente/eliminar/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error marking servicio as inactive with ID ${id}:`, error);
        throw error;
    }
};

// Obtener clientes con búsqueda y paginación
export const fetchClientesWithFilter = async (searchTerm = '', page = 0, size = 10) => {
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
        console.error('Error fetching clientes with filter:', error);
        throw error;
    }
};