import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { ServiciosForm } from "../components/form/ServiciosForm";



const initialServicios = [
	{
		id: 1,
		nombre: "Corte de Cabello",
		descripcion: "Corte de cabello clásico para hombre o mujer",
		precio: "25,000",
		estado: "Activo",
	},
	{
		id: 2,
		nombre: "Manicure",
		descripcion: "Servicio de manicure con esmaltado permanente",
		precio: "30,000",
		estado: "Activo",
	},
	{
		id: 3,
		nombre: "Pedicure",
		descripcion: "Pedicure completo con tratamiento exfoliante",
		precio: "35,000",
		estado: "Activo",
	},
	{
		id: 4,
		nombre: "Coloración",
		descripcion: "Coloración completa para todo tipo de cabello",
		precio: "80,000",
		estado: "Inactivo",
	},
	{
		id: 5,
		nombre: "Masaje Relajante",
		descripcion: "Masaje de cuerpo completo de 60 minutos",
		precio: "120,000",
		estado: "Activo",
	},
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
		servicioColumnHelper.accessor((row) => row.descripcion, {
			id: "descripcion",
			header: "Descripción",
		}),
		servicioColumnHelper.accessor((row) => row.precio, {
			id: "precio",
			header: "Precio",
		}),
		servicioColumnHelper.accessor((row) => row.estado, {
			id: "estado",
			header: "Estado",
		}),
	];

	const handleServicioUpdate = (updatedClient) => {
		// Lógica para actualizar servicio
	};

	const handleServicioDelete = (servicioToDelete) => {
		setServicios(servicios.filter((servicio) => servicio.id !== servicioToDelete.id));
	};
	return (
		<div>
			<h1 className="text-2xl font-bold">Servicios</h1>
			<div className="flex justify-end mb-4"><button className="bg-purple-500 hover:bg-purple-700
			  text-white font-bold py-2 px-4 rounded">add service </button></div>
			{/* <ServiciosForm onSubmit={handleServicioUpdate} />*/}
			<MyTable
				columns={servicioColumns}
				data={servicios}
				onRowUpdate={(row) => openModal("servicio", row)}
				onRowDelete={(row) => handleServicioDelete(row)}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={modalType === "servicio" ? handleServicioUpdate : ""}
				initialValues={modalData}
			/>
		</div>
	);
}
