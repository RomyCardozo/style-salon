import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";

export const MyTable = ({ columns, data, onRowUpdate, onRowDelete, onViewDetails }) => {
	// Estado para manejar la animación de las filas
	const [isVisible, setIsVisible] = useState(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	// Al montar el componente, activar la animación
	useEffect(() => {
		setIsVisible(true); // Activa la animación cuando el componente se monta
	}, []);

	return (
		<div className="overflow-x-auto rounded-lg">
			<table className="min-w-full divide-y divide-gray-200  ">
				<thead className="bg-purple-200">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{table.getRowModel().rows.map((row, index) => (
						<tr
							
							key={row.id}
							// Aplica la animación solo si es visible
							className={`transition-opacity duration-500 ease-out transform hover:bg-purple-100 ${
								isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
							}`}
							style={{ transitionDelay: `${index * 100}ms` }} // Añade un pequeño retraso para que las filas entren en secuencia
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-center justify-between p-4">
				<button
					onClick={() =>
						table.setPageIndex(
							table.getState().pagination.pageIndex - 1
						)
					}
					disabled={!table.getCanPreviousPage()}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
				>
					<FaChevronLeft className="h-5 w-5" />
				</button>
				<span className="text-sm font-medium text-gray-700">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</span>
				<button
					onClick={() =>
						table.setPageIndex(
							table.getState().pagination.pageIndex + 1
						)
					}
					disabled={!table.getCanNextPage()}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
				>
					<FaChevronRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};
