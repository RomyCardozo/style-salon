// services/detalleVentaService.js

import api from './api';


// Obtener los detalles de una venta específica por su ID
export const getVentaDetalles = async (id) => {
    try {
        const response = await api.get(`ventaDetalle/listard/${id}`);
        return response.data.ventaDetalle;
    } catch (error) {
        console.error("Error fetching venta detalles", error);
        throw error;
    }
};
