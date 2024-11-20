import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { useAuth } from '../context/AuthContext';
import {
	FaUsers,
	FaServicestack,
	FaUser,
	FaShoppingCart,
	FaChartBar,
	FaCog,
	FaUserCircle,
} from "react-icons/fa";
import { GiHairStrands } from "react-icons/gi";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth(); // Accede al contexto

  // Ejemplo de uso del rol del usuario para condicionar la visualización
  const menuItems = [
	  { icon: <FaUsers />, title: 'Clientes', link: '/home/clientes' },
	  { icon: <GiHairStrands />, title: 'Servicios', link: '/home/servicios' },
	  user?.rol?.descripcion === 'Administrador' ? { icon: <FaUser />, title: 'Usuarios', link: '/home/usuarios' } : null,
	  { icon: <FaShoppingCart />, title: 'Venta', link: '/home/venta' },
	  user?.rol?.descripcion === 'Administrador' ?  { icon: <FaChartBar />, title: 'Informes', link: '/home/informes' }: null,
	//  { icon: <FaCog />, title: 'Configuración', link: '/home/configuracion' },
	//  { icon: <FaUserCircle />, title: "Perfil", link: "/home/perfil" },
  ].filter(Boolean); 

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
