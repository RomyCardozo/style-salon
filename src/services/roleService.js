// src/services/rolesService.js
import api from './api';

// Obtener todos los roles
export const fetchRoles = async () => {
    try {
        const response = await api.get('rol/listar');
        return response.data.list;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
