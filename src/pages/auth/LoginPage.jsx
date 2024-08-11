import { Login } from "../../components/Login";

export const LoginPage = ({ setIsLoggedIn }) => {
	return(
	<div className="mx-auto">
		<Login setIsLoggedIn={setIsLoggedIn} />;
	</div>
	);
};

