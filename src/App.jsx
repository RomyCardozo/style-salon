import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
// pages
import { Clientes, Servicios, Usuarios, Venta, Informes, Configuracion, Perfil } from "./pages";
import { LoginPage } from "./pages/auth/LoginPage";
import { Login } from "./components/Login";

function App() {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Topbar />
				<main className="flex-1 p-10 bg-gray-100 mt-12">
					<Routes>
						<Route path="/clientes" element={<Clientes />} />
						<Route path="/servicios" element={<Servicios />} />
						<Route path="/usuarios" element={<Usuarios />} />
						<Route path="/venta" element={<Venta />} />
						<Route path="/informes" element={<Informes />} />
						<Route
							path="/configuracion"
							element={<Configuracion />}
						/>
						<Route path="/perfil" element={<Perfil />} />
						<Route path="/" element={<Clientes />} />
					</Routes>
				</main>
			</div>
		</div>
	);
}

export default App
