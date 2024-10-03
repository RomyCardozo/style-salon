import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { getVentaDetalles } from "../services/ventasService";

export const DetalleVenta = () => {
    const { id } = useParams();
    const [sale, setSale] = useState(null); // Para almacenar los detalles de la venta
    const [clienteNombre, setClienteNombre] = useState(''); // Para almacenar el nombre del cliente
    const [fechaVenta, setFechaVenta] = useState(''); // Para almacenar la fecha de la venta
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const printRef = React.useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const loadSale = async () => {
            try {
                setLoading(true);
                const fetchedSale = await getVentaDetalles(id); // Carga los datos de la venta
                setSale(fetchedSale.detalles); // Asigna los detalles de la venta
                setClienteNombre(fetchedSale.clienteNombre); // Asigna el nombre del cliente
                setFechaVenta(fetchedSale.fechaVenta); // Asigna la fecha de la venta
            } catch (err) {
                console.error("Error al cargar los detalles de la venta:", err);
                setError("No se pudieron cargar los detalles de la venta. Por favor, intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        loadSale();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    if (!sale || sale.length === 0) return <div>No se encontraron detalles para esta venta.</div>;

    return (
        <div className="p-6 bg-white rounded shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">
                Detalle de la Venta #{id}
            </h1>
            <div ref={printRef}>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">
                        Cliente: {clienteNombre}
                    </h2>
                    <h2 className="text-lg font-semibold">
                        Fecha: {new Date(fechaVenta).toLocaleDateString()}
                    </h2>
                </div>
                <table className="w-full mb-4">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Producto</th>
                            <th className="py-2 text-right">Cantidad</th>
                            <th className="py-2 text-right">Precio</th>
                            <th className="py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sale.map((item, index) => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2">{item.servicio.nombre}</td>
                                <td className="py-2 text-right">{item.cantidad}</td>
                                <td className="py-2 text-right">${item.precioUnitario.toFixed(2)}</td>
                                <td className="py-2 text-right">${(item.precioUnitario * item.cantidad).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-right">
                    <div className="mb-2">
                        Subtotal: ${sale.reduce((sum, item) => sum + item.subTotal, 0).toFixed(2)}
                    </div>
                    {/* Si tienes impuestos, puedes calcularlos aquí */}
                    {/* <div className="mb-2">Impuesto: ${sale.tax.toFixed(2)}</div> */}
                    <div className="font-bold">
                        Total: ${sale.reduce((sum, item) => sum + item.subTotal, 0).toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                <button
                    onClick={() => navigate("/home/venta")}
                    className="w-full p-3 mt-4 text-white bg-red-600 rounded"
                >
                    Cancelar
                </button>
                <ReactToPrint
                    bodyClass="p-10"
                    trigger={() => (
                        <button className="w-full p-3 mt-4 text-white bg-purple-600 rounded">
                            Imprimir Venta
                        </button>
                    )}
                    content={() => printRef.current}
                />
            </div>
        </div>
    );
};
