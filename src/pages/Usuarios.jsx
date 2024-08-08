import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../components/Modal";
const initialClients = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "John Doe", email: "john@example.com" },
	{ id: 3, name: "John Doe", email: "john@example.com" },
	{ id: 4, name: "John Doe", email: "john@example.com" },
	{ id: 5, name: "John Doe", email: "john@example.com" },
	{ id: 6, name: "John Doe", email: "john@example.com" },
	{ id: 8, name: "John Doe", email: "john@example.com" },
	{ id: 9, name: "John Doe", email: "john@example.com" },
	{ id: 10, name: "John Doe", email: "john@example.com" },
	// Otros clientes...
];
export const Usuarios = () => {
  return <div className="text-2xl font-bold">Usuarios</div>;
}
