import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const UsuariosForm = ({ onSubmit, initialValues, roles, modalType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            id: "",
            nombre: "",
            clave: "",
            email: "",
            estado: "Activo",
            rol: ""
        }
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                id: initialValues.id,
                nombre: initialValues.nombre,
                clave: initialValues.clave,
                email: initialValues.email,
                estado: initialValues.estado,
                rol: initialValues.rol ? initialValues.rol.id.toString() : ""
            });
        }
    }, [initialValues, reset]);

    const onSubmitForm = (data) => {
        // Convierte el id del rol a número antes de enviarlo
        const formattedData = {
            ...data,
            rol: parseInt(data.rol)
        };
        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                    {...register("nombre", { required: "Este campo es requerido" })}
                    className={`mt-1 p-2 w-full border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre.message}</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Clave</label>
                <input
                    {...register("clave", { required: modalType === "create" ? "Este campo es requerido" : false })}
                    className={`mt-1 p-2 w-full border rounded ${errors.clave ? 'border-red-500' : 'border-gray-300'}`}
                    type="password"
                />
                {errors.clave && <span className="text-red-500 text-sm">{errors.clave.message}</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    {...register("email", { 
                        required: "Este campo es requerido",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Dirección de email inválida"
                        }
                    })}
                    className={`mt-1 p-2 w-full border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Estado</label>
                <select
                    {...register("estado", { required: "Este campo es requerido" })}
                    className={`mt-1 p-2 w-full border rounded ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                {errors.estado && <span className="text-red-500 text-sm">{errors.estado.message}</span>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Rol</label>
                <select
                    {...register("rol", { required: "Este campo es requerido" })}
                    className={`mt-1 p-2 w-full border rounded ${errors.rol ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id} value={rol.id.toString()}>
                            {rol.descripcion}
                        </option>
                    ))}
                </select>
                {errors.rol && <span className="text-red-500 text-sm">{errors.rol.message}</span>}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    {modalType === "create" ? "Crear Usuario" : "Actualizar Usuario"}
                </button>
            </div>
        </form>
    );
};