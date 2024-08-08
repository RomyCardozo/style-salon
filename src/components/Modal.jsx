import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export const Modal = ({ isOpen, onClose, onSubmit, initialValues }) => {
	const [formData, setFormData] = useState(initialValues || {});

	useEffect(() => {
		setFormData(initialValues || {});
	}, [initialValues]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="fixed inset-0 bg-black opacity-50"
				onClick={onClose}
			></div>
			<div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-sm w-full">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">Form</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<FaTimes className="h-5 w-5" />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name || ""}
							onChange={handleChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
					{/* Agrega más campos aquí si es necesario */}
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-500 text-white rounded-md"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 text-white rounded-md"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
