import { useState } from "react";
import { MenuItem } from "./MenuItem";
import {
	FaUsers,
	FaServicestack,
	FaUser,
	FaShoppingCart,
	FaChartBar,
	FaCog,
	FaUserCircle,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const menuItems = [
	{ icon: <FaUsers />, title: "Clientes", link: "/clientes" },
	{ icon: <FaServicestack />, title: "Servicios", link: "/servicios" },
	{ icon: <FaUser />, title: "Usuarios", link: "/usuarios" },
	{ icon: <FaShoppingCart />, title: "Venta", link: "/venta" },
	{ icon: <FaChartBar />, title: "Informes", link: "/informes" },
	{ icon: <FaCog />, title: "Configuración", link: "/configuracion" },
	{ icon: <FaUserCircle />, title: "Perfil", link: "/perfil" },
];
export const Sidebar = () => {
  const location = useLocation();


	return (
		<div className="w-64 text-white flex-shrink-0 mt-16 p-4 bg-white shadow-lg rounded-lg">
			{menuItems.map((item) => (
				<div key={item.title}>
					<MenuItem
						title={item.title}
						icon={item.icon}
						active={location.pathname === item.link}
						link={item.link}
					/>
				</div>
			))}
		</div>
	);
};
