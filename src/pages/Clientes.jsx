import { useState, useEffect } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { ClienteForm } from "../components/form/ClienteForm";
import {
    fetchClientes,
    createCliente,
    updateCliente,
    deleteCliente
} from "../services/clientesService"; // Asegúrate de tener este servicio implementado

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export const Clientes = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const clientColumnHelper = createColumnHelper();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Estado para el modal de confirmación
    const [clientToDelete, setClientToDelete] = useState(null); // Cliente que se va a eliminar

    useEffect(() => {
        const loadClientes = async () => {
            try {
                const data = await fetchClientes();
                const activeClients = data.filter(cliente => cliente.estado === "Activo"); // Filtrar solo los clientes activos
                setClients(activeClients);
            } catch (error) {
                console.error('Error loading clients:', error);
                setError('Error loading clients');
            } finally {
                setLoading(false);
            }
        };

        loadClientes();
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

    const handleClientCreate = async (newClient) => {
        try {
            const createdClient = await createCliente(newClient);
            setClients([...clients, createdClient]);
            closeModal();
        } catch (error) {
            console.error('Error creating client:', error);
            setError('Error creating client');
        }
    };

    const handleClientUpdate = async (updatedClient) => {
        try {
            const updated = await updateCliente(updatedClient.id, updatedClient);
            setClients(clients.map(client =>
                client.id === updated.id ? updated : client
            ));
            closeModal();
        } catch (error) {
            console.error('Error updating client:', error);
            setError('Error updating client');
        }
    };

    // Abre el modal de confirmación para eliminar
    const openDeleteConfirm = (client) => {
        setClientToDelete(client); // Establece el cliente a eliminar
        setIsConfirmOpen(true); // Abre el modal de confirmación
    };

    // Confirma y elimina el cliente (soft delete)
    const confirmDelete = async () => {
        try {
            await deleteCliente(clientToDelete.id); // Llama al backend para hacer el soft delete
            setClients(clients.filter(client => client.id !== clientToDelete.id)); // Filtra el cliente eliminado de la lista
            setIsConfirmOpen(false); // Cierra el modal de confirmación
        } catch (error) {
            console.error('Error deleting client:', error);
            setError('Error deleting client');
        }
    };

    const clientColumns = [
        clientColumnHelper.accessor("id", {
            header: "ID",
        }),
        clientColumnHelper.accessor("nombre", {
            header: "Nombre",
        }),
        clientColumnHelper.accessor("apellido", {
            header: "Apellido",
        }),
        clientColumnHelper.accessor("email", {
            header: "Email",
        }),
        clientColumnHelper.accessor("telefono", {
            header: "Telefono",
        }),
       /* clientColumnHelper.accessor("estado", {
            header: "Estado",
        }),*/
        clientColumnHelper.display({
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
                        onClick={() => openDeleteConfirm(row.original)} // Abre el modal de confirmación
                        className="text-red-500 hover:text-red-700"
                    >
                        <MdDeleteForever size={30} />
                    </button>
                </div>
            ),
        }),
    ];

    if (loading) return <div>Cargando clientes...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => openModal("create")}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Cliente
                </button>
            </div>
            <MyTable columns={clientColumns} data={clients} />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <ClienteForm
                    initialValues={modalData}
                    modalType={modalType}
                    onSubmit={modalType === "create" ? handleClientCreate : handleClientUpdate}
                    onCancel={closeModal}
                />
            </Modal>

            {isConfirmOpen && (
                <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <div className="p-2 flex flex-col items-center text-center">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro que deseas eliminar este cliente?</h2>
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
