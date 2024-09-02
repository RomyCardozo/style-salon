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
	PosSalon,
} from "./";
import { DetalleVenta } from "./DetalleVenta";

export const Home = () => {
	return (
		<div className="flex w-full h-screen">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Topbar />
				<main className="flex-1 p-10 mt-12 bg-gray-100">
					<Routes>
						<Route path="clientes" element={<Clientes />} />
						<Route path="servicios" element={<Servicios />} />
						<Route path="usuarios" element={<Usuarios />} />
						<Route path="venta" element={<Venta />}></Route>
						<Route path="venta/:id" element={<DetalleVenta />}></Route>

						<Route
							path="/nueva-venta"
							element={<PosSalon />}
						></Route>
						<Route path="informes" element={<Informes />} />
						<Route
							path="configuracion"
							element={<Configuracion />}
						/>
						<Route path="perfil" element={<Perfil />} />
						{/* Ruta para manejar cualquier ruta no encontrada */}
						<Route path="*" element={<Clientes />} />
					</Routes>
					<Outlet /> {/* Aquí se renderizarán las rutas internas */}
				</main>
			</div>
		</div>
	);
};
