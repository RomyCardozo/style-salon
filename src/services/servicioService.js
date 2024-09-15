// src/services/servicioService.js
import api from './api';

// Obtener todos los servicios
export const fetchServicios = async () => {
    try {
        const response = await api.get('servicio/listar');
        return response.data.list;
    } catch (error) {
        console.error('Error fetching servicios:', error);
        throw error;
    }
};

export const fetchServicioById = async (id) => {
    try {
        const response = await api.get(`servicio/listar/${id}`);
        return response.data.Lista;
    } catch (error) {
        console.error(`Error fetching servicio with ID ${id}:`, error);
        throw error;
    }
};

// Agregar un nuevo servicio
export const createServicio = async (servicio) => {
    try {
        const response = await api.post('servicio/guardar', servicio);
        return response.data.servicio;
    } catch (error) {
        console.error('Error creating servicio:', error);
        throw error;
    }
};


// Actualizar un servicio existente
export const updateServicio = async (id, servicio) => {
    try {
        const response = await api.put(`servicio/editar/${id}`, servicio);
        return response.data.servicio;
    } catch (error) {
        console.error(`Error updating servicio with ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un servicio existente
export const deleteServicio = async (id) => {
    try {
        const response = await api.put(`servicio/eliminar/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error marking servicio as inactive with ID ${id}:`, error);
        throw error;
    }
};

// Obtener servicios con búsqueda y paginación
export const fetchServiciosWithFilter = async (searchTerm = '', page = 0, size = 10) => {
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
        console.error('Error fetching servicios with filter:', error);
        throw error;
    }
};