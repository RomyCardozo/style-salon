import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";

const initialClients = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "John Doe", email: "john@example.com" },
	{ id: 3, name: "John Doe", email: "john@example.com" },
	{ id: 4, name: "John Doe", email: "john@example.com" },
	{ id: 5, name: "John Doe", email: "john@example.com" },
	{ id: 6, name: "John Doe", email: "john@example.com" },
	{ id: 8, name: "John Doe", email: "john@example.com" },
	{ id: 9, name: "John Doe", email: "john@example.com" },
	{ id: 10, name: "John Doe", email: "john@example.com" },
	// Otros clientes...
];
export const Clientes = () => {
	const [clients, setClients] = useState(initialClients);
	const clientColumnHelper = createColumnHelper();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [modalType, setModalType] = useState(null);

	const openModal = (type, data = null) => {
		setModalType(type);
		setModalData(data);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setModalData(null);
	};

	const clientColumns = [
		clientColumnHelper.accessor((row) => row.id, {
			id: "id",
			header: "ID",
		}),
		clientColumnHelper.accessor((row) => row.name, {
			id: "name",
			header: "Name",
		}),
		clientColumnHelper.accessor((row) => row.email, {
			id: "email",
			header: "Email",
		}),
	];

	const handleClientUpdate = (updatedClient) => {
		// Lógica para actualizar cliente
	};

	const handleClientDelete = (clientToDelete) => {
		setClients(clients.filter((client) => client.id !== clientToDelete.id));
	};
	return (
		<div>
			<h1 className="text-2xl font-bold">Clientes</h1>
			<MyTable
				columns={clientColumns}
				data={clients}
				onRowUpdate={(row) => openModal("client", row)}
				onRowDelete={(row) => handleClientDelete(row)}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={modalType === "client" ? handleClientUpdate : ""}
				initialValues={modalData}
			/>
		</div>
	);
};
