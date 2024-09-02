import { createContext, useContext, useState, useEffect } from "react";
import {
	getUsers,
	addUser as addUserService,
	updateUser as updateUserService,
	deleteUser as deleteUserService,
} from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await getUsers();
				setUsers(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const addUser = async (user) => {
		try {
			await addUserService(user);
			// Refresh user list after adding a new user
			const updatedUsers = await getUsers();
			setUsers(updatedUsers);
		} catch (err) {
			setError(err);
		}
	};

	const updateUser = async (userId, user) => {
		try {
			await updateUserService(userId, user);
			// Refresh user list after updating a user
			const updatedUsers = await getUsers();
			setUsers(updatedUsers);
		} catch (err) {
			setError(err);
		}
	};

	const deleteUser = async (userId) => {
		try {
			await deleteUserService(userId);
			// Refresh user list after deleting a user
			const updatedUsers = await getUsers();
			setUsers(updatedUsers);
		} catch (err) {
			setError(err);
		}
	};

	return (
		<UserContext.Provider
			value={{ users, loading, error, addUser, updateUser, deleteUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
