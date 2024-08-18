import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const ClienteForm = ({ onSubmit, getClientById, data }) => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [client, setClient] = useState(null);

	// Fetch client data if editing
	useEffect(() => {
		console.log(data);
		if (data){
			setClient(data);
			reset(data);
		}
		if (id) {
			const fetchData = async () => {
				const data = await getClientById(id);
				setClient(data);
				reset(data);
			};
			fetchData();
		}
	}, [id, reset, getClientById]);

	const onSubmitForm = (data) => {
		console.log(data);
		onSubmit(data);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">
				{id ? "Editar Cliente" : "Crear Cliente"}
			</h2>
			<form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Nombre
					</label>
					<input
						type="text"
						{...register("nombre", {
							required: "El nombre es obligatorio",
							minLength: {
								value: 2,
								message: "El nombre debe tener al menos 2 caracteres",
							},
						})}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{errors.nombre && (
						<p className="text-red-500 text-xs mt-1">
							{errors.nombre.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Apellido
					</label>
					<input
						type="text"
						{...register("apellido", {
							required: "El apellido es obligatorio",
							minLength: {
								value: 2,
								message: "El apellido debe tener al menos 2 caracteres",
							},
						})}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{errors.apellido && (
						<p className="text-red-500 text-xs mt-1">
							{errors.apellido.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						type="email"
						{...register("email", {
							required: "El email es obligatorio",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "Email no válido",
							},
						})}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{errors.email && (
						<p className="text-red-500 text-xs mt-1">
							{errors.email.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Teléfono
					</label>
					<input
						type="text"
						{...register("telefono", {
							required: "El teléfono es obligatorio",
							pattern: {
								value: /^[0-9]{8,10}$/,
								message: "Número de teléfono no válido",
							},
						})}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{errors.telefono && (
						<p className="text-red-500 text-xs mt-1">
							{errors.telefono.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Estado
					</label>
					<select
						{...register("estado", {
							required: "El estado es obligatorio",
						})}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					>
						<option value="Activo">Activo</option>
						<option value="Inactivo">Inactivo</option>
					</select>
					{errors.estado && (
						<p className="text-red-500 text-xs mt-1">
							{errors.estado.message}
						</p>
					)}
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
					>
						{id ? "Actualizar" : "Crear"}
					</button>
				</div>
			</form>
		</div>
	);
};
