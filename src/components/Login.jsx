import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { authenticate, loading, error, isAuthenticated } = useAuth(); // Usa isAuthenticated
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticate(username, password);
    // Verifica si la autenticación fue exitosa
    if (isAuthenticated) {
      navigate("/home/clientes");
    }
  };

  return (
    <div className=" w-screen min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-purple-300 to-purple-500">
      <div className="bg-white/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm w-full max-w-md">
        <div className="mb-8 text-center ">
          <img
            src="/Logo2Salon.jpg"
            alt="Logo del Salón"
            className="w-32 h-32 mx-auto rounded-full border-4 border-purple-500 shadow-lg animate-pulse"
          />
          <h2 className="mt-4 text-2xl font-bold text-purple-800 ">Bienvenida a tu Salón</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Tu nombre de usuario"
              required // Añade required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Tu contraseña"
              required // Añade required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
