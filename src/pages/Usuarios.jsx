import { useState, useEffect } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { UsuariosForm } from "../components/form/UsuariosForm";
import {
    fetchUsuarios,
    fetchRoles,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../services/usuariosService";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const usuarioColumnHelper = createColumnHelper();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [usuarioToDelete, setUsuarioToDelete] = useState(null);

    useEffect(() => {
        const loadUsuariosAndRoles = async () => {
            try {
                const [usuariosData, rolesData] = await Promise.all([
                    fetchUsuarios(),
                    fetchRoles()
                ]);
                const activeUsuarios = usuariosData.filter(usuario => usuario.estado === "Activo");
                setUsuarios(activeUsuarios);
                setRoles(rolesData);
            } catch (error) {
                console.error('Error loading usuarios and roles:', error);
                setError('Error al cargar usuarios y roles. Por favor, intente de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        loadUsuariosAndRoles();
    }, []);

    const openModal = (type, data = null) => {
        setModalType(type);
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    const handleUsuarioCreate = async (newUsuario) => {
        try {
            //verifica que el usuario no sea repetido
            const existingUsuario = usuarios.find(
                (usuario) => usuario.nombre === newUsuario.nombre       
            );
            if (existingUsuario) {


                setError('El usuario ya existe. Por favor, elija otro nombre.');
                return;

            }
            // Asegúrate de que el rol sea un objeto con id y descripción
            const rolObject = roles.find(rol => rol.id === parseInt(newUsuario.rol));
            const usuarioToCreate = {
                ...newUsuario,
                rol: rolObject
            };
            const createdUsuario = await createUsuario(usuarioToCreate);
            setUsuarios([...usuarios, createdUsuario]);
            closeModal();
        } catch (error) {
            console.error('Error creating usuario:', error);
            setError('Error al crear el usuario. Por favor, intente de nuevo.');
        }
    };


    const handleUsuarioUpdate = async (updatedUsuario) => {
        try {
            // Asegúrate de que el rol sea un objeto con id y descripción
            const rolObject = roles.find(rol => rol.id === parseInt(updatedUsuario.rol));
            const usuarioToUpdate = {
                ...updatedUsuario,
                rol: rolObject
            };
            const updatedUser = await updateUsuario(usuarioToUpdate.id, usuarioToUpdate);
            setUsuarios(usuarios.map(usuario =>
                usuario.id === updatedUser.id ? updatedUser : usuario
            ));
            closeModal();
        } catch (error) {
            console.error('Error updating usuario:', error);
            setError('Error al actualizar el usuario. Por favor, intente de nuevo.');
        }
    };


    const openDeleteConfirm = (usuario) => {
        setUsuarioToDelete(usuario);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUsuario(usuarioToDelete.id);
            setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioToDelete.id));
            setIsConfirmOpen(false);
        } catch (error) {
            console.error('Error deleting usuario:', error);
            setError('Error al eliminar el usuario. Por favor, intente de nuevo.');
        }
    };

    const usuarioColumns = [
        usuarioColumnHelper.accessor("id", {
            header: "ID",
        }),
        usuarioColumnHelper.accessor("nombre", {
            header: "Nombre",
        }),
        usuarioColumnHelper.accessor("email", {
            header: "Email",
        }),
        usuarioColumnHelper.accessor("rol.descripcion", {
            header: "Rol",
        }),
        usuarioColumnHelper.accessor("estado", {
            header: "Estado",
        }),
        usuarioColumnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex space-x-4">
                    <button
                        onClick={() => openModal("edit", row.original)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <CiEdit size={30} />
                    </button>
                    <button
                        onClick={() => openDeleteConfirm(row.original)}
                        className="text-red-500 hover:text-red-700"
                    >
                        <MdDeleteForever size={30} />
                    </button>
                </div>
            ),
        }),
    ];

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => openModal("create")}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Usuario
                </button>
            </div>
            <MyTable columns={usuarioColumns} data={usuarios} />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <UsuariosForm
                    initialValues={modalData}
                    modalType={modalType}
                    roles={roles}
                    onSubmit={modalType === "create" ? handleUsuarioCreate : handleUsuarioUpdate}
                    onCancel={closeModal}
                />
            </Modal>

            {isConfirmOpen && (
                <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <div className="p-2 flex flex-col items-center text-center">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro que deseas eliminar este usuario?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsConfirmOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};