import axios from 'axios';

import { refreshSession } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:8080',  // Cambia esta URL por la de tu API
    timeout: 10000,  // Establece un timeout si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Interceptor de solicitud para añadir el token de autenticación
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');  // Obtener el token del almacenamiento local
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Añadir el token al header de la solicitud
        }
        return config;  // Retornar la configuración de la solicitud
    },
    error => {
        return Promise.reject(error);  // Retornar error si ocurre
    }
);

// Interceptor de respuesta para manejar errores y refrescar el token
api.interceptors.response.use(
    (response) => response,  // Retornar la respuesta si es exitosa
    async (error) => {
        const originalRequest = error.config;  // Obtener la solicitud original

        // Si la respuesta es un error 401 (no autorizado) y no ha sido reintentada
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Marcar la solicitud como reintentada
            try {
                const refreshToken = localStorage.getItem("refreshToken");  // Obtener el refresh token
                const { token } = await refreshSession(refreshToken);  // Llamar a la función de refresco
                localStorage.setItem("authToken", token);  // Guardar el nuevo token en el almacenamiento local
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // Actualizar el header de autorización
                return api(originalRequest);  // Reintentar la solicitud original
            } catch (err) {
                // Manejar el error de refresco del token
                localStorage.removeItem("authToken");  // Eliminar el token si falla
                localStorage.removeItem("refreshToken");  // Eliminar el refresh token si falla
                return Promise.reject(err);  // Retornar el error
            }
        }

        return Promise.reject(error);  // Retornar error si no es 401 o ya se reintentó
    }
);
/*api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const { token } = await refreshSession(refreshToken);
                localStorage.setItem("authToken", token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return api(originalRequest);
            } catch (err) {
                // Handle token refresh failure
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);*/

export default api;
