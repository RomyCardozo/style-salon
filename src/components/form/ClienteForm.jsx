import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ClienteForm = ({ onSubmit, initialValues, modalType }) => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			id: "",
			nombre: "",
			apellido: "",
			email: "",
			telefono: "",
			estado: "Activo",
		},
	});

	// Si se están editando los datos del cliente, establecemos los valores iniciales
	useEffect(() => {
		if (initialValues) {
			setValue("id", initialValues.id);
			setValue("nombre", initialValues.nombre);
			setValue("apellido", initialValues.apellido);
			setValue("email", initialValues.email);
			setValue("telefono", initialValues.telefono);
			setValue("estado", initialValues.estado);
		}
	}, [initialValues, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
			<div className="mb-4">
				<label className="block text-gray-700">Nombre</label>
				<input
					{...register("nombre", { required: "El nombre es obligatorio" })}
					className={`mt-1 p-2 w-full border rounded ${errors.nombre ? "border-red-500" : "border-gray-300"}`}
				/>
				{errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Apellido</label>
				<input
					{...register("apellido", { required: "El apellido es obligatorio" })}
					className={`mt-1 p-2 w-full border rounded ${errors.apellido ? "border-red-500" : "border-gray-300"}`}
				/>
				{errors.apellido && <span className="text-red-500 text-sm">{errors.apellido.message}</span>}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Email</label>
				<input
					type="email"
					{...register("email", {
						required: "El email es obligatorio",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Email no válido",
						},
					})}
					className={`mt-1 p-2 w-full border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
				/>
				{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Teléfono</label>
				<input
					type="text"
					{...register("telefono", {
						required: "El teléfono es obligatorio",
						pattern: {
							value: /^[0-9]{8,10}$/,
							message: "Número de teléfono no válido",
						},
					})}
					className={`mt-1 p-2 w-full border rounded ${errors.telefono ? "border-red-500" : "border-gray-300"}`}
				/>
				{errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
			</div>

			<div className="mb-4">
				<label className="block text-gray-700">Estado</label>
				<select
					{...register("estado", { required: "El estado es obligatorio" })}
					className={`mt-1 p-2 w-full border rounded ${errors.estado ? "border-red-500" : "border-gray-300"}`}
				>
					<option value="Activo">Activo</option>
					<option value="Inactivo">Inactivo</option>
				</select>
				{errors.estado && <span className="text-red-500 text-sm">{errors.estado.message}</span>}
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
			>
				{modalType === "create" ? "Crear Cliente" : "Actualizar Cliente"}
			</button>
		</form>
	);
};
