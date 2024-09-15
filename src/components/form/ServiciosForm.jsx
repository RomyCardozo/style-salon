import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const ServiciosForm = ({ onSubmit, initialValues, modalType }) => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            id: "",
            nombre: "",
            descripcion: "",
            precio: "",
            estado: ""
        }
    });

    useEffect(() => {
        if (initialValues) {
            // Set the values when editing
            setValue("id", initialValues.id);
            setValue("nombre", initialValues.nombre);
            setValue("descripcion", initialValues.descripcion);
            setValue("precio", initialValues.precio);
            setValue("estado", initialValues.estado);
        }
    }, [initialValues, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* ID and Nombre <div className="mb-4">
                <label className="block text-gray-700">ID</label>
                <input
                    {...register("id", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!!id} // Disable if editing
                />
                {errors.id && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>*/}
            <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                    {...register("nombre", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nombre && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <input
                    {...register("descripcion", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.descripcion ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.descripcion && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                    type="number"
                    step="0.01"
                    {...register("precio", { required: true, min: 0 })}
                    className={`mt-1 p-2 w-full border rounded ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.precio && <span className="text-red-500 text-sm">Este campo es requerido y debe ser un número positivo</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Estado</label>
                <select
                    {...register("estado", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                {errors.estado && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
                {/*{id ? "Actualizar Servicio" : "Crear Servicio"}*/}
                {modalType === "create" ? "Crear Servicio" : "Actualizar Servicio"}
            </button>
        </form>
    );
};
