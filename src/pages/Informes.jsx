import React, { useState } from 'react';
import "./informes.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getVentasByDateRange, getServiciosByDateRange } from '../services/ventasService';
import { notifyError } from '../utils/notificaciones';

const SalesReport = ({ data, startDate, endDate }) => {
  // Calcular el total de ingresos
  const totalIngresos = data.reduce((acc, row) => acc + (parseFloat(row.total) || 0), 0);

  // Calcular la cantidad total de ventas
  const cantidadVentas = data.length;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:p-0">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Informe de Ventas</h2>
      <p className="mb-4">Desde: {startDate} Hasta: {endDate}</p>
      <table className="w-full border-collapse border border-purple-200">
        <thead>
          <tr className="bg-purple-100">
            <th className="border border-purple-200 p-2">ID</th>
            <th className="border border-purple-200 p-2">Cliente</th>
            <th className="border border-purple-200 p-2">Servicio</th>
            <th className="border border-purple-200 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border border-purple-200 p-2">{row.id}</td>
              <td className="border border-purple-200 p-2">
                {row?.cliente ? `${row.cliente.nombre} ${row.cliente.apellido}` : "Cliente no disponible"}
              </td>
              <td className="border border-purple-200 p-2">
                {row?.detalles && row.detalles.length > 0
                  ? row.detalles[0]?.servicio?.nombre
                  : "Servicio no disponible"}
              </td>
              <td className="border border-purple-200 p-2">{row?.total}</td>
            </tr>
          ))}
          {/* Fila de Totales */}
          <tr className="bg-purple-50 font-bold">
            <td className="border border-purple-200 p-2" colSpan="3">Total de ingresos</td>
            <td className="border border-purple-200 p-2">{totalIngresos.toLocaleString('es-ES')}</td>
          </tr>
          {/* Fila de Cantidad de Ventas */}
          <tr className="bg-purple-50 font-bold">
            <td className="border border-purple-200 p-2" colSpan="3">Cantidad de ventas realizadas</td>
            <td className="border border-purple-200 p-2">{cantidadVentas}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const ServicesReport = ({ data, startDate, endDate }) => {
  // Calcular el total de cantidad e ingresos
  const totalCantidad = data.reduce((acc, service) => acc + (parseInt(service.cantidad) || 0), 0);
  const totalIngresos = data.reduce((acc, service) => acc + (parseFloat(service.total) || 0), 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:p-0">
      <h2 className="text-2xl font-bold mb-4 text-purple-800">Informe de Servicios</h2>
      <p className="mb-4">Desde: {startDate} Hasta: {endDate}</p>
      <table className="w-full border-collapse border border-purple-200">
        <thead>
          <tr className="bg-purple-100">
            <th className="border border-purple-200 p-2">Servicio</th>
            <th className="border border-purple-200 p-2">Cantidad</th>
            <th className="border border-purple-200 p-2">Ingresos Totales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((service, index) => (
            <tr key={index}>
              <td className="border border-purple-200 p-2">{service.nombre}</td>
              <td className="border border-purple-200 p-2">{service.cantidad}</td>
              <td className="border border-purple-200 p-2">{service.total}</td>
            </tr>
          ))}
          {/* Fila de Totales */}
          <tr className="bg-purple-50 font-bold">
            <td className="border border-purple-200 p-2">Totales</td>
            <td className="border border-purple-200 p-2">{totalCantidad}</td>
            <td className="border border-purple-200 p-2">{totalIngresos.toLocaleString('es-ES')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export function Informes() {
  const [reportType, setReportType] = useState('sales');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    try {
      // Validar rango de fechas antes de hacer cualquier otra cosa
      if (startDate > endDate) {
        notifyError('La fecha de inicio no puede ser mayor a la fecha de fin.');
        return;
      }

      let data;
      const startDateTime = `${startDate.toISOString().split('T')[0]}T00:00:00`;
      const endDateTime = `${endDate.toISOString().split('T')[0]}T23:59:59`;

      if (reportType === 'sales') {
        data = await getVentasByDateRange(startDateTime, endDateTime);
      } else {
        data = await getServiciosByDateRange(startDateTime, endDateTime);
      }

      // Verificar si hubo registros
      if (!data || data.length === 0) {
        notifyError('No se encontraron registros para el rango de fechas seleccionado.');
        setReportData(null); // Asegurarse de limpiar datos anteriores
        return;
      }

      console.log("Datos del informe:", data); // Imprimir los datos recibidos
      setReportData(data);
    } catch (error) {
      console.error("Error al generar el informe:", error);
      notifyError('No se pudieron obtener los datos del informe.');
    }
  };

  const handlePrintReport = () => {
    if (reportData) {
      window.print();
      // Captura solo los datos del reporte
    } else {
      notifyError('Por favor, genera un informe primero.');
    }
  };

  return (
    <div className="p-6 bg-purple-100 min-h-screen print:bg-white print:p-0">
      <div className="print:hidden">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">Informes</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <select
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              setReportData(null); // Limpiar los datos del informe
            }}
            className="w-48 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="sales">Informe de Ventas</option>
            <option value="services">Informe de Servicios</option>
          </select>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Fecha de inicio"
            className="w-48 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            dateFormat="yyyy-MM-dd" // Solo mostrar la fecha
            onKeyDown={(e) => e.preventDefault()} // Evita la entrada de texto
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Fecha de fin"
            className="w-48 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            dateFormat="yyyy-MM-dd" // Solo mostrar la fecha
            onKeyDown={(e) => e.preventDefault()} // Evita la entrada de texto
          />
        </div>
        <div className="space-x-4">
          <button
            onClick={handleGenerateReport}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generar Informe
          </button>
          <button
            onClick={handlePrintReport}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Imprimir Informe
          </button>
        </div>
      </div>
      {reportData && (
        <div className="mt-8 print:mt-0 printable ">
          {reportType === 'sales' ? (
            <SalesReport
              data={reportData}
              startDate={startDate.toLocaleDateString()}
              endDate={endDate.toLocaleDateString()}
            />
          ) : (
            <ServicesReport
              data={reportData}
              startDate={startDate.toLocaleDateString()}
              endDate={endDate.toLocaleDateString()}
            />
          )}
        </div>
      )}
    </div>
  );
}
