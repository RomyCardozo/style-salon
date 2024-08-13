import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { ClienteForm } from "../components/form/ClienteForm";

const initialClients = [
	{
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@example.com",
        telefono: "+1234567890",
        estado: "Activo",
    },
    {
        id: 2,
        nombre: "Ana",
        apellido: "Gómez",
        email: "ana.gomez@example.com",
        telefono: "+0987654321",
        estado: "Inactivo"
    },
    {
        id: 3,
        nombre: "Luis",
        apellido: "Martínez",
        email: "luis.martinez@example.com",
        telefono: "+1122334455",
        estado: "Activo",
    },
    {
        id: 4,
        nombre: "María",
        apellido: "Rodríguez",
        email: "maria.rodriguez@example.com",
        telefono: "+5566778899",
        estado: "Activo",
    },
    {
        id: 5,
        nombre: "Carlos",
        apellido: "Hernández",
        email: "carlos.hernandez@example.com",
        telefono: "+6677889900",
        estado: "Inactivo",
    }
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
		clientColumnHelper.accessor((row) => row.nombre, {
			id: "nombre",
			header: "Nombre",
		}),
		clientColumnHelper.accessor((row) => row.apellido, {
			id: "apellido",
			header: "Apellido",
		}),
		clientColumnHelper.accessor((row) => row.email, {
			id: "email",
			header: "Email",
		}),
		clientColumnHelper.accessor((row) => row.telefono, {
			id: "telefono",
			header: "Telefono",
		}),
		clientColumnHelper.accessor((row) => row.estado, {
			id: "estado",
			header: "Estado",
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
			{/* <ClienteForm /> */}
			 <div className="flex justify-end mb-4"><button className="bg-purple-500 hover:bg-purple-700
			  text-white font-bold py-2 px-4 rounded">add cliente </button></div>
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
