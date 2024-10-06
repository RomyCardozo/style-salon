import { createContext, useContext, useState, useEffect } from "react";
import {
	login as loginService,
  getCurrentUser,
  refreshSession,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const currentUser = await getCurrentUser(token);
          setUser(currentUser);
          setIsAuthenticated(true); // Cambiado a true si hay un usuario
        } catch (err) {
          console.error("Failed to fetch user during initialization", err);
          logout();
        }
      }
    };

    initializeAuth();
  }, [token]);

  const authenticate = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const { token, refreshToken } = await loginService(username, password);
      localStorage.setItem("authToken", token);
 	 localStorage.setItem("refreshToken", refreshToken);
      setToken(token);
      const currentUser = await getCurrentUser(token);
      setUser(currentUser);
      setIsAuthenticated(true); // Cambiado a true si la autenticación es exitosa
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const refreshAuthSession = async (refreshToken) => {
    setLoading(true);
    setError(null);

    try {
      const { token } = await refreshSession(refreshToken);
      localStorage.setItem("authToken", token);
      setToken(token);

      if (user) {
        const updatedUser = await getCurrentUser(token);
        setUser(updatedUser);
      }
    } catch (err) {
      setError(err.message || "An error occurred during session refresh");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        authenticate,
        refreshAuthSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
