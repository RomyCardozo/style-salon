import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const VentaForm = ({ onSubmit, initialData }) => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            id: "",
            fecha: "",
            total: "",
            estado: "",
            usuario: "",
            cliente: ""
        }
    });

    useEffect(() => {
        if (initialData && id) {
            // Set the values when editing
            setValue("id", initialData.id);
            setValue("fecha", initialData.fecha);
            setValue("total", initialData.total);
            setValue("estado", initialData.estado);
            setValue("usuario", initialData.usuario);
            setValue("cliente", initialData.cliente);
        }
    }, [id, initialData, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">ID</label>
                <input
                    {...register("id", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!!id} // Disable if editing
                />
                {errors.id && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Fecha</label>
                <input
                    type="date"
                    {...register("fecha", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.fecha ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fecha && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Total</label>
                <input
                    type="number"
                    step="0.01"
                    {...register("total", { required: true, min: 0 })}
                    className={`mt-1 p-2 w-full border rounded ${errors.total ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.total && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número positivo</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Estado</label>
                <select
                    {...register("estado", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">Seleccionar estado</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                {errors.estado && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Usuario</label>
                <input
                    {...register("usuario", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.usuario ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.usuario && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Cliente</label>
                <input
                    {...register("cliente", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.cliente ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cliente && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
                {id ? "Actualizar Venta" : "Crear Venta"}
            </button>
        </form>
    );
};
