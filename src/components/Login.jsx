import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";



export const Login = () => {
	const { authenticate, loginLoading, loginError } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		await authenticate(username, password);
		navigate("/home/clientes");
	};
    return (
        <section className=" h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ">
            <div className="md:w-1/3 max-w-sm animate-pulse">
                <img
                    src="/Logo2Salon.jpg"
                    alt="Imagen de muestra"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Usuario"
					required
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
                />
               {/*} <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Recuérdame</span>
                    </label>
                    <a
                        className="text-purple-600 hover:text-purple-700 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        ¿Olvidaste tu Contraseña?
                    </a>
                </div> */}
                <div className="text-center md:text-left">
                    <button
                    disabled={loginLoading}
                    onClick={handleSubmit}
                        className="mt-4 bg-purple-600 hover:bg-purple-400 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                       type="submit"
                       
                    >
                        Iniciar Sesión
                    </button>
                    {loginError && (
						<p className="text-sm text-red-600">{loginError}</p>
					)}
                </div>
            </div>
        </section>
    );
};
