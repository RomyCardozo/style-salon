import { Link } from "react-router-dom";

export const MenuItem = ({ icon, title, active, link }) => {
	return (
		<Link to={link}
			className={`flex items-center p-2 my-1 transition-colors duration-200
			 text-white rounded-lg cursor-pointer hover:bg-purple-300 ${
				active
					? "bg-purple-300 text-black"
					: "text-white hover:text-black"
			}`}
		>
			<div className="text-xl">{icon}</div>
			<span className="ml-3">{title}</span>
		</Link>
	);
};
