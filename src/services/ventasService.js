// src/services/salesService.js
import api from './api';

export const getSales = async () => {
    const response = await api.get('/ventas');
    return response.data;
};

export const addSale = async (sale) => {
    const response = await api.post('/ventas', sale);
    return response.data;
};

export const updateSale = async (saleId, sale) => {
    const response = await api.put(`/ventas/${id}`, sale);
    return response.data;
};

export const deleteSale = async (saleId) => {
    const response = await api.delete(`/ventas/${id}`);
    return response.data;
};
