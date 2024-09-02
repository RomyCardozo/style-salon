import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSales } from "../context/SalesContext";

export const DetalleVenta = () => {
	const { id } = useParams(); // Obtener el id de la venta desde la URL
	const { fetchSaleById, loading, error } = useSales();
	const [sale, setSale] = useState(null);
	const printRef = React.useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const loadSale = async () => {
			const fetchedSale = await fetchSaleById(id);
			setSale(fetchedSale);
		};

		loadSale();
	}, [id, fetchSaleById]);

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>{error}</div>;
	if (!sale) return <div>Venta no encontrada</div>;

	return (
		<div className="p-6 bg-white rounded shadow-lg">
			<h1 className="mb-4 text-2xl font-bold">
				Detalle de la Venta #{sale.id}
			</h1>

			{/* Detalle de la venta */}
			<div ref={printRef}>
				<div className="mb-4">
					<h2 className="text-lg font-semibold">
						Cliente: {sale.customerName}
					</h2>
					<h2 className="text-lg font-semibold">
						Fecha: {new Date(sale.date).toLocaleDateString()}
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
						{sale.items.map((item) => (
							<tr key={item.id} className="border-b">
								<td className="py-2">{item.name}</td>
								<td className="py-2 text-right">
									{item.quantity}
								</td>
								<td className="py-2 text-right">
									${item.price.toFixed(2)}
								</td>
								<td className="py-2 text-right">
									${(item.price * item.quantity).toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="text-right">
					<div className="mb-2">
						Subtotal: ${sale.subtotal.toFixed(2)}
					</div>
					<div className="mb-2">Impuesto: ${sale.tax.toFixed(2)}</div>
					<div className="font-bold">
						Total: ${sale.total.toFixed(2)}
					</div>
				</div>
			</div>

			{/* Botón para imprimir */}
			<div className="flex gap-5">
				<button
					onClick={() => navigate("/dashboard/venta")}
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
