import "./App.css";
import { authFlow, getDataAuth } from "./setup";
import { getToken } from "./getToken";
import { useNavigate } from "react-router";

function App() {
	const navigate = useNavigate();
	
	const handleSetup = async () => {
		const code = await getDataAuth();
		authFlow(code);
  	};

	const handleToken = () => {
		getToken();
		navigate("/dashboard");
  	};

	return (
		<>
			<h1>Hola Mundo</h1>

			<button onClick={handleSetup}>Start Setup</button>
			<button onClick={handleToken}>Get Token</button>
		</>
	);
}

export default App;
