import api from './api';

{/*export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", {
            username, password,
        })
        return response.data;
    } catch (error) {
        throw new Error(`Login error: ${error.response?.data?.message || error.message}`);
    }
}

// Get Current Auth User
export const getCurrentUser = async (token) => {
    try {
        const response = await api.get('/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Get user error: ${error.response?.data?.message || error.message}`);
    }
};

// Refresh Auth Session
export const refreshSession = async (refreshToken) => {
    try {
        const response = await api.post('/auth/refresh', {
            refreshToken,
            expiresInMins: 30, // opcional
        });
        return response.data;
    } catch (error) {
        throw new Error(`Refresh token error: ${error.response?.data?.message || error.message}`);
    }
};*/}

// src/services/authService.js

export const login = async (username, password) => {
    // Simula un inicio de sesión exitoso con un usuario y token ficticios
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: "fake-token",
                refreshToken: "fake-refresh-token",
                user: { id: 1, username: "admin", role: "admin" }
            });
        }, 1000); // Simula un retraso en la respuesta
    });
};

export const getCurrentUser = async (token) => {
    // Simula la obtención del usuario actual
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, username: "admin", role: "admin" });
        }, 1000); // Simula un retraso en la respuesta
    });
};

export const refreshSession = async (refreshToken) => {
    // Simula la actualización del token
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ token: "new-fake-token" });
        }, 1000); // Simula un retraso en la respuesta
    });
};