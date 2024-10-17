// src/services/ventasService.js
import api from './api';

// Obtener todas las ventas
export const getVentas = async () => {
    const response = await api.get('ventas/listar');
    return response.data;
};



// Agregar una nueva venta
export const addVenta = async (venta) => {
    const response = await api.post('ventas/guardar1', venta);
    return response.data.venta;
};

// Actualizar una venta existente
export const updateVenta = async (id, venta) => {
    const response = await api.put(`ventas/editar2/${id}`, venta);
    return response.data;
};

// Soft delete (marcar como inactiva) una venta
export const softDeleteVenta = async (id) => {
    try {
        const response = await api.put(`ventas/eliminar/${id}`, { estado: 'Inactivo' });
        return response.data;
    } catch (error) {
        console.error("Error al marcar la venta como inactiva:", error);
        throw error;
    }
};

export const getVentaDetalles = async (id) => {
    try {
        const response = await api.get(`ventaDetalle/listard/${id}`);
        console.log("lista",response.data);
        if (response.status === 204 || !response.data) {
            return { detalles: [], clienteNombre: '', fechaVenta: '' }; // Maneja el caso cuando no hay datos
        }
        
        // Retorna un objeto con los detalles de la venta, el nombre del cliente y la fecha
        return {
            detalles: response.data.detalles,
            clienteNombre: response.data.clienteNombre,
            fechaVenta: response.data.fechaVenta
        };

        
    } catch (error) {
        console.error("Error fetching venta detalles", error);
        throw error;
    }
 
};

// Obtener ventas por rango de fechas
export const getVentasByDateRange = async (startDate, endDate) => {
    const response = await api.get(`/informes/ventas`, {
        params: {
            startDate,
            endDate,
        },
    });
   // console.log(response.data); 
    return response.data;
};

// Obtener resumen de servicios por rango de fechas
export const getServiciosByDateRange = async (startDate, endDate) => {
    const response = await api.get(`/informes/servicios`, {
        params: {
            startDate,
            endDate,
        },
    });
    console.log(response.data); 
    return response.data;
};

