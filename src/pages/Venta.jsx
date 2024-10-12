
import { useState, useEffect } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
import { VentaForm } from "../components/form/VentaForm";
import {
    getVentas,
    addVenta,
    updateVenta,
    softDeleteVenta
} from "../services/ventasService";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export const Venta = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const columnHelper = createColumnHelper();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [ventaToDelete, setVentaToDelete] = useState(null);
    const loadVentas = async () => {
        try {
            const response = await getVentas();
            //ordena las ventas por id
            response.list.sort((a, b) => a.id - b.id);
            console.log(response.list); // Verifica el contenido de la respuesta
            const activeVentas = response.list.filter(venta => venta.estado === "Activo");
            setVentas(activeVentas);
        } catch (error) {
            console.error('Error loading ventas:', error);
            setError('Error al cargar las ventas. Por favor, intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadVentas();
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

    const handleVentaCreate = async (newVenta) => {
        try {
            const createdVenta = await addVenta(newVenta);
            setVentas([...ventas, createdVenta]);
            closeModal();
            
        } catch (error) {
            console.error('Error creating venta:', error);
            setError('Error al crear la venta. Por favor, intente de nuevo.');
        }
    };

    const handleVentaUpdate = async (updatedVenta) => {
        try {
            const updatedData = await updateVenta(updatedVenta.id, updatedVenta);
            setVentas((prevVentas) =>
                prevVentas.map(venta => venta.id === updatedData.id ? updatedData : venta)
            );
            loadVentas();
            closeModal();
        } catch (error) {
            console.error('Error updating venta:', error);
            setError('Error al actualizar la venta. Por favor, intente de nuevo.');
        }
    };



    const openDeleteConfirm = (venta) => {
        setVentaToDelete(venta);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await softDeleteVenta(ventaToDelete.id);
            setVentas(ventas.filter(venta => venta.id !== ventaToDelete.id));
            setIsConfirmOpen(false);
        } catch (error) {
            console.error('Error deleting venta:', error);
            setError('Error al eliminar la venta. Por favor, intente de nuevo.');
        }
    };

    const ventaColumns = [
        columnHelper.accessor("id", {
            header: "ID",
        }),
        columnHelper.accessor("cliente.nombre", {
            header: "Cliente",
        }),
        columnHelper.accessor("usuario.nombre", {
            header: "Usuario",
        }),
        columnHelper.accessor("fecha", {
            header: "Fecha",
        }),
        columnHelper.accessor("total", {
            header: "Total",
        }),
       /* columnHelper.accessor("estado", {
            header: "Estado",
        }),*/
        columnHelper.display({
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex space-x-2 align-middle justify-start ">
                    <button
                        onClick={() => openModal("edit", row.original)}
                        className="text-blue-500 hover:text-blue-700 "
                    >
                        <CiEdit size={30} />
                    </button>
                    <button
                        onClick={() => openDeleteConfirm(row.original)}
                        className="text-red-500 hover:text-red-700  "
                    >
                        <MdDeleteForever size={30} />
                    </button>
                    <button
                        onClick={() => { window.location.href = `/home/venta/${row.original.id}` }}
                        className="text-green-500 hover:text-green-700"
                    >
                        <FaEye size={25} />
                    </button>
                </div>
            ),
        }),
    ];

    if (loading) return <div>Cargando ventas...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Ventas</h1>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => openModal("create")}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Agregar Venta
                </button>
            </div>
            <MyTable columns={ventaColumns} data={ventas} />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <VentaForm
                    initialValues={modalData}
                    modalType={modalType}
                    onSubmit={modalType === "create" ? handleVentaCreate : handleVentaUpdate}
                    onCancel={closeModal}
                />
            </Modal>

            {isConfirmOpen && (
                <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
                    <div className="p-2 flex flex-col items-center text-center">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro que deseas eliminar esta venta?</h2>
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
