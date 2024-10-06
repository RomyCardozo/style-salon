

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

import axios from 'axios';
// src/services/authService.js 
/* 
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
}; */

import api from './api';

export const login = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:8080/auth/login", {
            username, password,
        })
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;

        // Maneja el código de estado 401 para mostrar un mensaje más amigable
        if (status === 401) {
            throw new Error("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
        } else if (errorMessage.includes("User not found")) {
            throw new Error("El nombre de usuario no existe.");
        } else if (errorMessage.includes("Invalid password")) {
            throw new Error("La contraseña es incorrecta. Inténtalo de nuevo.");
        } else {
            throw new Error("Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
    }
};



export const getCurrentUser = async (token) => {
    const response = await fetch("http://localhost:8080/auth/currentUser", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    console.log("Response:", response); // Muestra la respuesta completa en la consola

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return await response.json();
};

export const refreshSession = async (refreshToken) => {
    const response = await axios.post(`auth/refresh`, {
        refreshToken,
    });

    return response.data; 
};

/*const logout = () => {
    localStorage.removeItem("accessToken"); // Eliminar el access token guardado
    localStorage.removeItem("refreshToken"); // Eliminar el refresh token guardado
    window.location.href = "/"; // Redirigir a la página de login
};*/
