import { createContext, useContext } from "react";
import useApi from "../hooks/useApi";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
	const { data: services, loading, error, refetch } = useApi("/servicio");

	const getServices = async () => {
		await useApi("/listar", "GET", null, false).refetch();
		refetch();
	}
	const addService = async (service) => {
		await useApi("/guardar", "POST", service, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de agregar uno nuevo
	};

	const updateService = async (serviceId, service) => {
		await useApi(`/products/${serviceId}`, "PUT", service, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de modificar uno
	};

	const deleteService = async (serviceId) => {
		await useApi(`/products/${serviceId}`, "DELETE", null, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de eliminar uno
	};

	return (
		<ServiceContext.Provider
			value={{ services, loading, error, addService, updateService, deleteService, getServices }}
		>
			{children}
		</ServiceContext.Provider>
	);
};

export const useService = () => useContext(ServiceContext);
