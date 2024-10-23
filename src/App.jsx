import { Route, Routes } from "react-router-dom";
// pages
import { Home } from "./pages";
import { LoginPage } from "./pages/auth/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import { PrivateRoutes } from "./routes/PrivateRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { SalesProvider } from "./context/SalesContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ServiceProvider } from "./context/ServicesContext";

function App() {
	return (
		<div className="flex w-full bg-gray-50">
			<AuthProvider>
				<UserProvider>
					<SalesProvider>
						<CustomerProvider>
							<ServiceProvider>
							<Routes>
								<Route path="/">
								
									{/* Public Routes */}
									<Route element={<PublicRoutes />}>
										<Route
											index
											element={<LoginPage />}
										></Route>
									</Route>


									{/* Private Routes */}
									<Route element={<PrivateRoutes />}>
										<Route
											path="/home/*"
											element={<Home />}
										></Route>

									</Route>
									<Route
										path="*"
										element={<h1>Page not found</h1>}
									/>
								</Route>
							</Routes>
							</ServiceProvider>
						</CustomerProvider>
					</SalesProvider>
				</UserProvider>
			</AuthProvider>
			<ToastContainer />
		</div>
	);
}

export default App;
