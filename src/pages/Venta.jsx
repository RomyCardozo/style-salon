import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { VentaForm } from "../components/form/VentaForm";

const initialVentas= [
  {
    id: "1",
    fecha: "2024-08-01",
    total: 150.00,
    estado: "Activo",
    usuario: "juan123",
    cliente: "Ana Pérez"
},
{
    id: "2",
    fecha: "2024-08-02",
    total: 200.00,
    estado: "Activo",
    usuario: "maria456",
    cliente: "Carlos López"
},
{
    id: "3",
    fecha: "2024-08-03",
    total: 120.50,
    estado: "Activo",
    usuario: "pedro789",
    cliente: "Laura Martínez"
},
{
    id: "4",
    fecha: "2024-08-04",
    total: 300.00,
    estado: "Activo",
    usuario: "luis321",
    cliente: "Sofia Rodríguez"
},
{
    id: "5",
    fecha: "2024-08-05",
    total: 250.75,
    estado: "Activo",
    usuario: "carla654",
    cliente: "Miguel Gómez"
},
{
    id: "6",
    fecha: "2024-08-06",
    total: 175.00,
    estado: "Activo",
    usuario: "david987",
    cliente: "Elena Fernández"
}
];
export const Venta = () => {
  const [ventas, setVentas] = useState(initialVentas);
	const ventaColumnHelper = createColumnHelper();
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

	const ventaColumns = [
		ventaColumnHelper.accessor((row) => row.id, {
			id: "id",
			header: "ID",
		}),
		ventaColumnHelper.accessor((row) => row.fecha, {
			id: "fecha",
			header: "Fecha",
		}),
		ventaColumnHelper.accessor((row) => row.total, {
			id: "total",
			header: "Total",
		}),
		ventaColumnHelper.accessor((row) => row.estado, {
			id: "estado",
			header: "Estado",
		}),
		ventaColumnHelper.accessor((row) => row.usuario, {
			id: "usuario",
			header: "Usuario",
		}),
    ventaColumnHelper.accessor((row) => row.cliente, {
			id: "cliente",
			header: "Cliente",
		}),
	];

	const handleVentaUpdate = (updatedVenta) => {
		// Lógica para actualizar venta
	};

	const handleVentaDelete = (ventaToDelete) => {
		setVentas(ventas.filter((venta) => venta.id !== ventaToDelete.id));
	};
	return (
		<div>
			<h1 className="text-2xl font-bold">Ventas</h1>
			<VentaForm/>
			<div className="flex justify-end mb-4"><button className="bg-purple-500 hover:bg-purple-700
			  text-white font-bold py-2 px-4 rounded">add venta </button></div>
			<MyTable
				columns={ventaColumns}
				data={ventas}
				onRowUpdate={(row) => openModal("venta", row)}
				onRowDelete={(row) => handleVentaDelete(row)}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={modalType === "venta" ? handleVentaUpdate : ""}
				initialValues={modalData}
			/>
		</div>
	);
}
