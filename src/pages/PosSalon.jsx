import React, { useState } from "react";

const categories = [
	{
		name: "Cortes",
		items: [
			{ id: 1, name: "Corte Básico", price: 15.0 },
			{ id: 2, name: "Corte con Estilo", price: 20.0 },
		],
	},
	{
		name: "Tinturas",
		items: [
			{ id: 3, name: "Tinte Básico", price: 40.0 },
			{ id: 4, name: "Reflejos", price: 50.0 },
		],
	},
	{
		name: "Manicura",
		items: [
			{ id: 5, name: "Manicura Básica", price: 25.0 },
			{ id: 6, name: "Manicura Completa", price: 30.0 },
		],
	},
];

export const PosSalon = () => {
	const [cart, setCart] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(cartItem) => cartItem.id === item.id
			);
			if (existingItem) {
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Main Content */}
			<main className="flex w-full p-4">
				<div className="w-4/5 pr-4">
					<div className="grid grid-cols-2 gap-4">
						{categories.map((category) => (
							<div
								key={category.name}
								className="p-4 bg-gray-200 rounded"
							>
								<h2 className="mb-2 font-bold">
									{category.name}
								</h2>
								{category.items.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between mb-2"
									>
										<span>{item.name}</span>
										<span>${item.price.toFixed(2)}</span>
										<button
											className="p-2 text-white bg-blue-500 rounded"
											onClick={() => addToCart(item)}
										>
											+
										</button>
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				<div className="w-2/5 p-4 bg-white rounded shadow-lg">
					<h2 className="mb-4 text-lg font-bold">Carrito</h2>
					<ul>
						{cart.map((item) => (
							<li
								key={item.id}
								className="flex items-center justify-between mb-2"
							>
								<span>
									{item.name} x{item.quantity}
								</span>
								<span>
									${(item.price * item.quantity).toFixed(2)}
								</span>
							</li>
						))}
					</ul>
					<div className="pt-4 mt-4 border-t">
						<div className="flex justify-between">
							<span>Subtotal:</span>
							<span>${calculateTotal()}</span>
						</div>
						<div className="flex justify-between">
							<span>Impuesto (10%):</span>
							<span>${(calculateTotal() * 0.1).toFixed(2)}</span>
						</div>
						<div className="flex justify-between mt-2 font-bold">
							<span>Total:</span>
							<span>${(calculateTotal() * 1.1).toFixed(2)}</span>
						</div>
						<div className="mt-4">
							<button className="w-full p-3 text-white bg-green-500 rounded">
								Pagar
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
