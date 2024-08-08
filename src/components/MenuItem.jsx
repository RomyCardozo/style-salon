import { Link } from "react-router-dom";

export const MenuItem = ({ icon, title, active, link }) => {
	return (
		<Link to={link}
			className={`flex items-center p-2 my-1 transition-colors duration-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 ${
				active
					? "bg-blue-100 text-blue-500"
					: "text-gray-600 hover:text-blue-500"
			}`}
		>
			<div className="text-xl">{icon}</div>
			<span className="ml-3">{title}</span>
		</Link>
	);
};
