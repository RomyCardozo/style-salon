import { createContext, useContext } from "react";
import useApi from "../hooks/useApi";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
	const { data: users, loading, error, refetch } = useApi("/users");

	const addCustomer = async (customer) => {
		await useApi("/users", "POST", customer, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de agregar uno nuevo
	};

	const updateCustomer = async (userId, customer) => {
		await useApi(`/users/${userId}`, "PUT", customer, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de modificar uno
	};

	const deleteCustomer = async (userId) => {
		await useApi(`/users/${userId}`, "DELETE", null, false).refetch();
		refetch(); // Actualiza la lista de usuarios después de eliminar uno
	};

	return (
		<CustomerContext.Provider
			value={{ users, loading, error, addCustomer, updateCustomer, deleteCustomer }}
		>
			{children}
		</CustomerContext.Provider>
	);
};

export const useCustomer = () => useContext(CustomerContext);
