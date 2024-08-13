// Table.jsx
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const MyTable = ({ columns, data, onRowUpdate, onRowDelete, onViewDetails }) => {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="overflow-x-auto rounded-lg">
			<table className="min-w-full divide-y divide-gray-200 ">
				<thead className="bg-gray-50">
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
							<th className="px-6 py-3"></th>
						</tr>
					))}
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
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
							<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button
									onClick={() => onRowUpdate(row.original)}
									className="text-indigo-600 hover:text-indigo-900"
								>
									<CiEdit size={30} />
								</button>
								<button
									onClick={() => onRowDelete(row.original)}
									className="ml-4 text-red-600 hover:text-red-900"
								>
									<MdDeleteForever size={30} />
								</button>
								{
									row.original.isSale && ( // Verifica si es una fila de ventas
										<button
											onClick={() => onViewDetails(row.original)}
											className="ml-4 text-blue-600 hover:text-blue-900"
										>
											<FaEye  size={25} />
										</button>
									)
								}
							</td>
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
