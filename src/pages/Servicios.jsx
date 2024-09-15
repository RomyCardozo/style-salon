import { useState, useEffect } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { ServiciosForm } from "../components/form/ServiciosForm";
import {
    fetchServicios,
    createServicio,
    updateServicio,
    deleteServicio
} from "../services/servicioService";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const servicioColumnHelper = createColumnHelper();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Estado para el modal de confirmación
    const [servicioToDelete, setServicioToDelete] = useState(null); // Servicio que se va a eliminar

    useEffect(() => {
        const loadServicios = async () => {
            try {
                const data = await fetchServicios();
                const activeServices = data.filter(servicio => servicio.estado === "Activo"); // Filtrar solo los servicios activos
                setServicios(activeServices);
            } catch (error) {
                console.error('Error loading servicios:', error);
                setError('Error loading services');
            } finally {
                setLoading(false);
            }
        };

        loadServicios();
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

    const handleServiceCreate = async (newService) => {
        try {
            const createdService = await createServicio(newService);
            setServicios([...servicios, createdService]);
            closeModal();
        } catch (error) {
            console.error('Error creating servicio:', error);
            setError('Error creating service');
        }
    };

    const handleServicioUpdate = async (updatedService) => {
        try {
            const updatedServicio = await updateServicio(updatedService.id, updatedService);
            setServicios(servicios.map(servicio =>
                servicio.id === updatedServicio.id ? updatedServicio : servicio
            ));
            closeModal();
        } catch (error) {
            console.error('Error updating servicio:', error);
            setError('Error updating service');
        }
    };

    /* const handleServicioDelete = async (servicioToDelete) => {
         try {
             await deleteServicio(servicioToDelete.id);
             setServicios(servicios.filter(servicio => servicio.id !== servicioToDelete.id));
         } catch (error) {
             console.error('Error deleting servicio:', error);
             setError('Error deleting service');
         }
     };*/
    // Abre el modal de confirmación para eliminar
    const openDeleteConfirm = (servicio) => {
        setServicioToDelete(servicio); // Establece el servicio a eliminar
        setIsConfirmOpen(true); // Abre el modal de confirmación
    };

    // Confirma y elimina el servicio
    const confirmDelete = async () => {
        try {
            await deleteServicio(servicioToDelete.id); // Llama al backend para eliminar
            setServicios(servicios.filter(servicio => servicio.id !== servicioToDelete.id)); // Filtra el servicio eliminado de la lista
            setIsConfirmOpen(false); // Cierra el modal de confirmación
        } catch (error) {
            console.error('Error deleting servicio:', error);
            setError('Error deleting service');
        }
    };

    const servicioColumns = [
        servicioColumnHelper.accessor("id", {
            header: "ID",
        }),
        servicioColumnHelper.accessor("nombre", {
            header: "Nombre",
        }),
        servicioColumnHelper.accessor("descripcion", {
            header: "Descripción",
        }),
        servicioColumnHelper.accessor("precio", {
            header: "Precio",
            cell: info => `$${info.getValue().toLocaleString()}`,
        }),
        servicioColumnHelper.accessor("estado", { //este ver si es necesario que se vea o que se edite
            header: "Estado",
        }),
        servicioColumnHelper.display({
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
                        onClick={() => openDeleteConfirm(row.original)} // Cambia esto para que abra el modal
                        className="text-red-500 hover:text-red-700"
                    >
                        <MdDeleteForever size={30} />
                    </button>
                </div>
            ),
        }),
    ];

    if (loading) return <div>Cargando servicios...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Servicios</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => openModal("create")}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Servicio
                </button>
            </div>
            <MyTable columns={servicioColumns} data={servicios} />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <ServiciosForm
                    initialValues={modalData}
                    modalType={modalType}
                    onSubmit={modalType === "create" ? handleServiceCreate : handleServicioUpdate}
                    onCancel={closeModal}
                />


            </Modal>

            {isConfirmOpen && (
                <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <div className="p-2 flex flex-col items-center  text-center "  >
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro que deseas eliminar este servicio?</h2>
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
