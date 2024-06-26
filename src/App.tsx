import React, { lazy } from "react";

const AppointmentDetails = lazy(
	() => import("src/components/AppointmentDetails")
);

const App: React.FC = () => {
	return (
		<>
			<AppointmentDetails
				loading={false}
				appointment={{ doctor: "doc", Start: new Date() }}
			/>
		</>
	);
};

export default App;
