import React, { lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const Appointments = lazy(() => import("src/containers/Appointments"));

const App: React.FC = () => {
	return (
		<ErrorBoundary>
			<Appointments />
		</ErrorBoundary>
	);
};

export default App;
