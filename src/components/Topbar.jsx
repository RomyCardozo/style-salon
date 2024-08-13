import { useState } from "react";
import { FaBell, FaCaretDown, FaSearch } from "react-icons/fa";

export const Topbar = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleLogout = () => {

		// Aquí puedes agregar la lógica para cerrar sesión
		console.log("Logout clicked");
	};
	return (
		<div className="right-0  text-white h-16 z-10 w-full bg-gradient-to-r from-purple-100 via-purple-300 	 to-purple-100 shadow p-4 flex justify-between items-center fixed top-0 left-0">
			<div className="flex items-center ">
				<img
					src="/Logo2Salon.jpg"
					alt="Profile"
					className="w-10 h-10 rounded-full"
				/>
				<span className="ml-2 font-medium text-black">Victoria</span>
				<button onClick={toggleDropdown} className="ml-2 text-gray-600">
					<FaCaretDown />
				</button>
				{dropdownOpen && (
					<div className="absolute mt-28 left-10 w-48 bg-white shadow-lg rounded-lg py-2">
						<button
							onClick={handleLogout}
							className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
							
						>
							Cerrar sesión 
						</button>
					</div>
				)}
			</div>

	{/*	<FaSearch className="text-gray-600 text-xl ml-4 cursor-pointer"	<div className="relative">
				<FaBell className="text-blue-500 text-xl cursor-pointer" />
				<span className="absolute bottom-3 right-0 left-2.5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs px-1 h-3 w-3">
					1
				</span>
			</div>/>*/}
		</div>
	);
};
