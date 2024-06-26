import React, { lazy } from "react";

const Appointments = lazy(() => import("src/containers/Appointments"));

const App: React.FC = () => {
	return (
		<>
			<Appointments />
		</>
	);
};

export default App;
