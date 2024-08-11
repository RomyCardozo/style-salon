import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";



const initialServicios = [
	{
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@example.com",
        telefono: "+1234567890",
        estado: "Activo"
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
        estado: "Activo"
    },
    {
        id: 4,
        nombre: "María",
        apellido: "Rodríguez",
        email: "maria.rodriguez@example.com",
        telefono: "+5566778899",
        estado: "Activo"
    },
    {
        id: 5,
        nombre: "Carlos",
        apellido: "Hernández",
        email: "carlos.hernandez@example.com",
        telefono: "+6677889900",
        estado: "Inactivo"
    }
	// Otros clientes...
];
export const Servicios = () => {
  
	const [servicios, setServicios] = useState(initialServicios);
	const servicioColumnHelper = createColumnHelper();
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

	const servicioColumns = [
		servicioColumnHelper.accessor((row) => row.id, {
			id: "id",
			header: "ID",
		}),
		servicioColumnHelper.accessor((row) => row.nombre, {
			id: "nombre",
			header: "Nombre",
		}),
		servicioColumnHelper.accessor((row) => row.apellido, {
			id: "apellido",
			header: "Apellido",
		}),
		servicioColumnHelper.accessor((row) => row.email, {
			id: "email",
			header: "Email",
		}),
		servicioColumnHelper.accessor((row) => row.telefono, {
			id: "telefono",
			header: "Telefono",
		}),
		servicioColumnHelper.accessor((row) => row.estado, {
			id: "estado",
			header: "Estado",
		}),
	];

	const handleClientUpdate = (updatedClient) => {
		// Lógica para actualizar servicioe
	};

	const handleClientDelete = (servicioToDelete) => {
		setServicios(servicios.filter((servicio) => servicio.id !== servicioToDelete.id));
	};
	return (
		<div>
			<h1 className="text-2xl font-bold">Servicios</h1>
			<MyTable
				columns={servicioColumns}
				data={servicios}
				onRowUpdate={(row) => openModal("servicio", row)}
				onRowDelete={(row) => handleClientDelete(row)}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={modalType === "servicio" ? handleClientUpdate : ""}
				initialValues={modalData}
			/>
		</div>
	);
}
