import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { UsuariosForm } from "../components/form/UsuariosForm";
const initialUsuarios = [
	{
        id: 1,
        nombre: "Juan Pérez",
        clave: "password123",
        email: "juan.perez@example.com",
        estado: "Activo",
        rol: "Administrador"
    },
    {
        id: 2,
        nombre: "María Gómez",
        clave: "securePass",
        email: "maria.gomez@example.com",
        estado: "Inactivo",
        rol: "Usuario"
    },
    {
        id: 3,
        nombre: "Luis Martínez",
        clave: "qwerty456",
        email: "luis.martinez@example.com",
        estado: "Activo",
        rol: "Usuario"
    },
    {
        id: 4,
        nombre: "Ana Rodríguez",
        clave: "ana2023",
        email: "ana.rodriguez@example.com",
        estado: "Activo",
        rol: "Administrador"
    },
    {
        id: 5,
        nombre: "Carlos Hernández",
        clave: "pass789",
        email: "carlos.hernandez@example.com",
        estado: "Inactivo",
        rol: "Usuario"
    },
    {
        id: 6,
        nombre: "Elena Fernández",
        clave: "elena321",
        email: "elena.fernandez@example.com",
        estado: "Activo",
        rol: "Usuario"
    },
    {
        id: 7,
        nombre: "Pedro Sánchez",
        clave: "pedro!#45",
        email: "pedro.sanchez@example.com",
        estado: "Inactivo",
        rol: "Administrador"
    },
    {
        id: 8,
        nombre: "Lucía García",
        clave: "lucia987",
        email: "lucia.garcia@example.com",
        estado: "Activo",
        rol: "Usuario"
    },
    {
        id: 9,
        nombre: "Miguel Torres",
        clave: "miguel000",
        email: "miguel.torres@example.com",
        estado: "Inactivo",
        rol: "Administrador"
    },
    {
        id: 10,
        nombre: "Sofía López",
        clave: "sofia456",
        email: "sofia.lopez@example.com",
        estado: "Activo",
        rol: "Usuario"
    }
];
export const Usuarios = () => {
	const [usuarios, setUsuarios] = useState(initialUsuarios);
	const usuarioColumnHelper = createColumnHelper();
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

	const usuarioColumns = [
		usuarioColumnHelper.accessor((row) => row.id, {
			id: "id",
			header: "ID",
		}),
		usuarioColumnHelper.accessor((row) => row.nombre, {
			id: "nombre",
			header: "Nombre",
		}),
		usuarioColumnHelper.accessor((row) => row.clave, {
			id: "clave",
			header: "Clave",
		}),
		usuarioColumnHelper.accessor((row) => row.email, {
			id: "email",
			header: "Email",
		}),
		usuarioColumnHelper.accessor((row) => row.estado, {
			id: "estado",
			header: "Estado",
		}),
		usuarioColumnHelper.accessor((row) => row.rol, {
			id: "rol",
			header: "Rol",
		}),
	];

	const handleUsuarioUpdate = (updatedUsuario) => {
		// Lógica para actualizar usuario
	};

	const handleUsuarioDelete = (usuarioToDelete) => {
		setUsuarios(usuarios.filter((usuario) => usuario.id !== usuarioToDelete.id));
	};
	return (
		<div>
			<h1 className="text-2xl font-bold">Usuarios</h1>
			{/* <UsuariosForm/>*/}
			<div className="flex justify-end mb-4"><button className="bg-purple-500 hover:bg-purple-700
			  text-white font-bold py-2 px-4 rounded">add usuario </button></div>
			<MyTable
				columns={usuarioColumns}
				data={usuarios}
				onRowUpdate={(row) => openModal("usuario", row)}
				onRowDelete={(row) => handleUsuarioDelete(row)}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={modalType === "usuario" ? handleUsuarioUpdate : ""}
				initialValues={modalData}
			/>
		</div>
	);
}
