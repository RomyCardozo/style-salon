import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchClientes } from "../../services/clientesService";
import { fetchUsuarios } from "../../services/usuariosService";
import { fetchServicios } from "../../services/servicioService";


export const VentaForm = ({ onSubmit, initialValues, modalType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset
    } = useForm({
        defaultValues: {
            id: "",   // Mantiene el ID de la venta para edición
            //por defecto la fecha debe ser la actual
            fecha: new Date().toISOString().slice(0, 10),
            //      fecha: "",
            total: 0,
            estado: "Activo",
            usuario: "",
            cliente: "",
            detalles: []
        }
    });

    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [detalles, setDetalles] = useState([{ servicioId: '', cantidad: 1, precioUnitario: 0 }]); // Primer detalle obligatorio
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const loadClientesYUsuarios = async () => {
            try {
                const [clientesData, usuariosData, serviciosData] = await Promise.all([
                    fetchClientes(),
                    fetchUsuarios(),
                    fetchServicios()
                ]);
                setClientes(clientesData);
                setUsuarios(usuariosData);
                setServicios(serviciosData);
            } catch (error) {
                console.error('Error loading clientes, usuarios, and servicios:', error);
            }
        };

        loadClientesYUsuarios();
    }, []);

    useEffect(() => {
        if (initialValues) {
            reset({
                id: initialValues.id || '',
                fecha: initialValues.fecha || '',
                total: initialValues.total || 0,
                estado: initialValues.estado || 'Activo',
                usuario: initialValues.usuario?.id.toString() || '',  // Asegúrate de convertir el ID a string
                cliente: initialValues.cliente?.id.toString() || '',
                detalles: initialValues.detalles?.length > 0
                    ? initialValues.detalles
                    : [{ servicioId: '', cantidad: 1, precioUnitario: 0 }]
            });
            setDetalles(
                initialValues.detalles?.length > 0
                    ? initialValues.detalles
                    : [{ servicioId: '', cantidad: 1, precioUnitario: 0 }]
            ); // Asegúrate de que siempre haya un detalle // Asegura que haya al menos un detalle
        }
    }, [initialValues, reset]);

    // Formatear datos antes de enviar el formulario
    const onSubmitForm = (data) => {
        const formattedData = {
            ...data,
            usuario: { id: parseInt(data.usuario) },  // Backend espera objeto usuario
            cliente: { id: parseInt(data.cliente) },  // Backend espera objeto cliente
            detalles: detalles.map(detalle => ({
                servicio: { id: detalle.servicioId },  // Pasar el ID del servicio
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precioUnitario,
                subTotal: detalle.subTotal, ///cambie acaaaa
                estado: 'Activo'  // Detalles en estado activo
            }))
        };
        console.log("Submitting formatted data:", formattedData);  // Agrega este log
        onSubmit(formattedData); // Enviar datos formateados
    };

    const addDetalle = () => {
        setDetalles([...detalles, { servicioId: '', cantidad: 1, precioUnitario: 0 }]);
    };

    const removeDetalle = (index) => {
        if (detalles.length > 1) { // Solo permite eliminar si hay más de un detalle
            const newDetalles = detalles.filter((_, i) => i !== index);
            setDetalles(newDetalles);
        }
    };

    const handleDetalleChange = (index, field, value) => {
        const newDetalles = detalles.map((detalle, i) =>
            i === index ? { ...detalle, [field]: value } : detalle
        );
        setDetalles(newDetalles);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4 overflow-scroll h-96">
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha</label>
                    <input
                        type="datetime-local"
                        id="fecha"
                        {...register("fecha", { required: "La fecha es requerida" })}
                    />
                    {errors.fecha && <span>{errors.fecha.message}</span>}
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700">Total</label>
                    <input
                        {...register("total", { required: "Este campo es requerido", valueAsNumber: true })}
                        type="number"
                        className={`mt-1 p-2 w-full border rounded ${errors.total ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.total && <span className="text-red-500 text-sm">{errors.total.message}</span>}
                </div>*/}
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
                    <label className="block text-gray-700">Usuario</label>
                    <Controller
                        name="usuario"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className={`mt-1 p-2 w-full border rounded ${errors.usuario ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Seleccione un usuario</option>
                                {usuarios.filter(usuario => usuario.estado === "Activo")
                                .map(usuario => (
                                    <option key={usuario.id} value={usuario.id.toString()}>
                                        {usuario.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.usuario && <span className="text-red-500 text-sm">{errors.usuario.message}</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Cliente</label>
                    <Controller
                        name="cliente"
                        control={control}
                        rules={{ required: "Este campo es requerido" }}
                        render={({ field }) => (
                            <select
                                {...field}
                                className={`mt-1 p-2 w-full border rounded ${errors.cliente ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Seleccione un cliente</option>
                                {clientes.filter(cliente => cliente.estado === "Activo")
                                .map(cliente => (
                                    <option key={cliente.id} value={cliente.id.toString()}>
                                        {cliente.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente.message}</span>}
                </div>

                {/* Sección para detalles de la venta */}
                <div className="mb-4">
                    <label className="block text-gray-700">Detalles de la Venta</label>
                    {detalles.map((detalle, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <div className="mb-2">
                                <select
                                    value={detalle.servicioId}
                                    onChange={(e) => handleDetalleChange(index, 'servicioId', e.target.value)}
                                    className="mt-1 p-2 w-full border rounded"
                                    required
                                >
                                    <option value="">Seleccione un servicio</option>
                                    {servicios
                                        .filter(servicio => servicio.estado === "Activo") // Filtrar servicios con estado "Activo"
                                        .map(servicio => (
                                            <option key={servicio.id} value={servicio.id}>
                                                {servicio.nombre}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="block text-gray-700 mr-2">Cantidad:</label>
                                <input
                                    type="number"
                                    value={detalle.cantidad}
                                    onChange={(e) => handleDetalleChange(index, 'cantidad', e.target.value)}
                                    className="mt-1 p-2 border rounded w-1/3"
                                    min="1"
                                />
                            </div>
                            {/*}  <div className="flex items-center mb-2">
                                <label className="block text-gray-700 mr-2">Precio unitario:</label>
                                <input
                                    type="number"
                                    value={detalle.precioUnitario}
                                    onChange={(e) => handleDetalleChange(index, 'precioUnitario', e.target.value)}
                                    className="mt-1 p-2 border rounded w-1/3"
                                    min="0"
                                    step="0.01"
                                />
                            </div> */}

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeDetalle(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar detalle
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDetalle}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Añadir detalle
                    </button>
                </div>

                <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">Guardar</button>
            </div>
        </form>
    );
};
