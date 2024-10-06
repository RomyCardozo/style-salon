import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

// Datos de ejemplo (reemplazar con tu lógica real de obtención de datos)
const sampleData = [
  { id: 1, client: 'Sara', service: 'Corte de pelo', total: 35 },
  { id: 2, client: 'Romi', service: 'Tinte', total: 80 },
  { id: 3, client: 'Sofia', service: 'Peinado', total: 50 },
]

const SalesReport = ({ data, startDate, endDate }) => (
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
            <td className="border border-purple-200 p-2">{row.client}</td>
            <td className="border border-purple-200 p-2">{row.service}</td>
            <td className="border border-purple-200 p-2">{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ServicesReport = ({ data, startDate, endDate }) => {
  const servicesSummary = data.reduce((acc, curr) => {
    if (!acc[curr.service]) acc[curr.service] = { count: 0, total: 0 };
    acc[curr.service].count++;
    acc[curr.service].total += curr.total;
    return acc;
  }, {})

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
          {Object.entries(servicesSummary).map(([service, { count, total }]) => (
            <tr key={service}>
              <td className="border border-purple-200 p-2">{service}</td>
              <td className="border border-purple-200 p-2">{count}</td>
              <td className="border border-purple-200 p-2">{total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Informes() {
  const [reportType, setReportType] = useState('sales')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [reportData, setReportData] = useState(null)

  const handleGenerateReport = () => {
    // Aquí iría la lógica para obtener los datos reales del informe
    // Por ahora, usamos los datos de ejemplo
    setReportData(sampleData)
  }

  const handlePrintReport = () => {
    if (reportData) {
      window.print()
    } else {
      alert('Por favor, genera un informe primero.')
    }
  }

  return (
    <div className="p-6 bg-purple-100 min-h-screen print:bg-white print:p-0">
      <div className="print:hidden">
        <h1 className="text-3xl font-bold mb-6 text-purple-800">Informes</h1>
        <div className="mb-4 flex space-x-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
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
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Fecha de fin"
            className="w-48 p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <div className="mt-8 print:mt-0">
          {reportType === 'sales' ? (
            <SalesReport 
              data={reportData} 
              startDate={startDate.toDateString()} 
              endDate={endDate.toDateString()} 
            />
          ) : (
            <ServicesReport 
              data={reportData} 
              startDate={startDate.toDateString()} 
              endDate={endDate.toDateString()} 
            />
          )}
        </div>
      )}
    </div>
  )
}