import { Outlet, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import {
	Clientes,
	Servicios,
	Usuarios,
	Venta,
	Informes,
	Configuracion,
	Perfil,
} from "./";

export const Home = () => {
	return (
		<div className="flex h-screen w-full">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Topbar />
				<main className="flex-1 p-10 bg-purple-300 mt-12">
					<Routes>
						<Route path="clientes" element={<Clientes />} />
						<Route path="servicios" element={<Servicios />} />
						<Route path="usuarios" element={<Usuarios />} />
						<Route path="venta" element={<Venta />} />
						<Route path="informes" element={<Informes />} />
						<Route
							path="configuracion"
							element={<Configuracion />}
						/>
						<Route path="perfil" element={<Perfil />} />
						<Route path="/" element={<Clientes />} />
					</Routes>
					<Outlet /> {/* Aquí se renderizarán las rutas internas */}
				</main>
			</div>
		</div>
	);
};
