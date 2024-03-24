import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Archived from "./components/Archived";
import Nav from "./components/Nav";
const App = () => {
	return (
		<div className="">
			<Nav  />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/archived" element={<Archived />} />
			</Routes>
		</div>
	);
};
export default App;
