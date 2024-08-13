import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const UsuariosForm = ({ onSubmit, initialData }) => {
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
            clave: "",
            email: "",
            estado: "",
            rol: ""
        }
    });

    useEffect(() => {
        if (initialData && id) {
            // Set the values when editing
            setValue("id", initialData.id);
            setValue("nombre", initialData.nombre);
            setValue("clave", initialData.clave);
            setValue("email", initialData.email);
            setValue("estado", initialData.estado);
            setValue("rol", initialData.rol);
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
                <label className="block text-gray-700">Nombre</label>
                <input
                    {...register("nombre", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nombre && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Clave</label>
                <input
                    {...register("clave", { required: true })}
                    type="password"
                    className={`mt-1 p-2 w-full border rounded ${errors.clave ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.clave && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    {...register("email", { 
                        required: true, 
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingrese un correo electrónico válido"
                        }
                    })}
                    className={`mt-1 p-2 w-full border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
                <label className="block text-gray-700">Rol</label>
                <input
                    {...register("rol", { required: true })}
                    className={`mt-1 p-2 w-full border rounded ${errors.rol ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.rol && <span className="text-red-500 text-sm">Este campo es requerido</span>}
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
            >
                {id ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
        </form>
    );
};
