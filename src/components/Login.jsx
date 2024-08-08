import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
			<div className="md:w-1/3 max-w-sm">
				<img
					src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					alt="Imagen de muestra"
				/>
			</div>
			<div className="md:w-1/3 max-w-sm">
				<input
					className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
					type="text"
					placeholder="Dirección de Correo Electrónico"
				/>
				<input
					className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
					type="password"
					placeholder="Contraseña"
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
					<Link to={'/'}>
						<button
							className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
							type="submit"
						>
							Iniciar Sesión
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};
