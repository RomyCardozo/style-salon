import { useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { useForm } from "react-hook-form";

export const CrudTable = () => {
	const data = useMemo(
		() => [
			{ id: 1, name: "Cliente 1", email: "cliente1@example.com" },
			{ id: 2, name: "Cliente 2", email: "cliente2@example.com" },
			// ... más datos
		],
		[]
	);

	const columns = useMemo(
		() => [
			{ Header: "ID", accessor: "id" },
			{ Header: "Name", accessor: "name" },
			{ Header: "Email", accessor: "email" },
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
	} = useTable(
		{
			columns,
			data,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: "selection",
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<input
							type="checkbox"
							{...getToggleAllRowsSelectedProps()}
						/>
					),
					Cell: ({ row }) => (
						<input
							type="checkbox"
							{...row.getToggleRowSelectedProps()}
						/>
					),
				},
				...columns,
				{
					id: "actions",
					Header: "Actions",
					Cell: ({ row }) => (
						<div>
							<button onClick={() => onEdit(row.original)}>
								Edit
							</button>
							<button onClick={() => onDelete(row.original)}>
								Delete
							</button>
						</div>
					),
				},
			]);
		}
	);

	const [editData, setEditData] = useState(null);
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		if (editData) {
			// Update logic here
			console.log("Updated:", data);
		} else {
			// Create logic here
			console.log("Created:", data);
		}
		reset();
		setEditData(null);
	};

	const onEdit = (row) => {
		setEditData(row);
		reset(row);
	};

	const onDelete = (row) => {
		// Delete logic here
		console.log("Deleted:", row);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="mb-4">
				<input
					{...register("id")}
					placeholder="ID"
					readOnly={editData}
				/>
				<input {...register("name")} placeholder="Name" />
				<input {...register("email")} placeholder="Email" />
				<button type="submit">{editData ? "Update" : "Create"}</button>
				<button
					type="button"
					onClick={() => {
						reset();
						setEditData(null);
					}}
				>
					Cancel
				</button>
			</form>
			<table {...getTableProps()} className="min-w-full bg-white">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th key={column.id}
									{...column.getHeaderProps()}
									className="py-2"
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr key={row.id} {...row.getRowProps()} className="border-t">
								{row.cells.map((cell) => (
									<td key={row.id}
										{...cell.getCellProps()}
										className="py-2"
									>
										{cell.render("Cell")}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
