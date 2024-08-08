import { Link, useLocation } from "react-router-dom";

export const Breadcrumb = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<nav className="bg-white p-3 rounded mb-4 shadow">
			<ol className="list-reset flex">
				{pathnames.length > 0 ? (
					<li>
						<Link
							to="/"
							className="text-blue-600 hover:text-blue-700"
						>
							Inicio
						</Link>
						<span className="mx-2">/</span>
					</li>
				) : (
					<li className="text-gray-500">Inicio</li>
				)}
				{pathnames.map((value, index) => {
					const to = `/${pathnames.slice(0, index + 1).join("/")}`;
					const isLast = index === pathnames.length - 1;
					return isLast ? (
						<li key={to} className="text-gray-500">
							{value}
						</li>
					) : (
						<li key={to}>
							<Link
								to={to}
								className="text-blue-600 hover:text-blue-700"
							>
								{value.charAt(0).toUpperCase() + value.slice(1)}
							</Link>
							<span className="mx-2">/</span>
						</li>
					);
				})}
			</ol>
		</nav>
	);
};
