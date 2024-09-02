import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const SalesContext = createContext();

// Datos ficticios de ventas
const dummySalesData = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2024-08-01T12:00:00Z",
    items: [
      { id: 1, name: "Corte Básico", quantity: 2, price: 15.0 },
      { id: 2, name: "Tinte Básico", quantity: 1, price: 40.0 },
    ],
    subtotal: 70.0,
    tax: 7.0,
    total: 77.0,
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "2024-08-03T15:30:00Z",
    items: [
      { id: 3, name: "Manicura Completa", quantity: 1, price: 30.0 },
      { id: 4, name: "Corte con Estilo", quantity: 1, price: 20.0 },
    ],
    subtotal: 50.0,
    tax: 5.0,
    total: 55.0,
  },
];

export const SalesProvider = ({ children }) => {
	const [sales, setSales] = useState(dummySalesData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchSaleById = async (id) => {
		setLoading(true);
		try {
			// Simula un retraso de red
			// await new Promise((resolve) => setTimeout(resolve, 500));

			// Aquí se haría la llamada a la API
			// const response = await useApi(`/sales/${id}`);
			// setSales((prevSales) => ({
			//   ...prevSales,
			//   [id]: response.data,
			// }));

			const fetchedSale = sales[id];
			if (!fetchedSale) {
				setError("Venta no encontrada");
				setLoading(false);
				return null;
			}

			setLoading(false);
			return fetchedSale;
		} catch (err) {
			setError("Error al cargar la venta");
			setLoading(false);
		}
	};

	return (
		<SalesContext.Provider value={{ sales, fetchSaleById, loading, error }}>
			{children}
		</SalesContext.Provider>
	);
};

// Hook para usar el contexto
export const useSales = () => {
	return useContext(SalesContext);
};
