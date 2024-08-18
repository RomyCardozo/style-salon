import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export const Modal = ({ isOpen, onClose, onSubmit, initialValues, children}) => {
	const [formData, setFormData] = useState(initialValues || {});

	useEffect(() => {
		console.log(initialValues);
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
					{/* <h2 className="text-lg font-semibold">Form</h2> */}
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<FaTimes className="h-5 w-5" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};
