import axios from 'axios';

import { refreshSession } from './authService';

const api = axios.create({
    baseURL: 'http://localhost:8080',  // Cambia esta URL por la de tu API
    timeout: 10000,  // Establece un timeout si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
});


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
