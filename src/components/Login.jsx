import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Verifica las credenciales
        if (email === '' && password === '') {
            setIsLoggedIn(true);  // Usuario autenticado
            navigate('/Home');     // Redirige a la página principal
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="/salon_viky.jpg"
                    alt="Imagen de muestra"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Dirección de Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Recuérdame</span>
                    </label>
                    <a
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        ¿Olvidaste tu Contraseña?
                    </a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="button"
                        onClick={handleLogin}  // Maneja el clic del botón
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </section>
    );
};
