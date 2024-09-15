import { useState } from "react";
import { MenuItem } from "./MenuItem";
import {
	FaUsers,
	FaServicestack,
	FaUser,
	FaShoppingCart,
	FaChartBar,
	FaCog
} from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { useLocation } from "react-router-dom";

const menuItems = [
	{ icon: <FaUsers />, title: "Clientes", link: "/home/clientes" },
	{ icon: <GiHairStrands />, title: "Servicios", link: "/home/servicios" },
	{ icon: <FaUser />, title: "Usuarios", link: "/home/usuarios" },
	{ icon: <FaShoppingCart />, title: "Venta", link: "/home/venta" },
	{ icon: <FaChartBar />, title: "Informes", link: "/home/informes" },
	{ icon: <FaCog />, title: "Configuración", link: "/home/configuracion" },
	//{ icon: <FaUserCircle />, title: "Perfil", link: "/home/perfil" },
];
export const Sidebar = () => {
  const location = useLocation();


	return (
<div className="w-64 text-white flex-shrink-0 mt-16 p-4 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 shadow-lg rounded-lg">

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
