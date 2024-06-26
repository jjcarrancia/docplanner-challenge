import React, { lazy } from "react";
import RescheduleAppointment from "./components/RescheduleAppointment";

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
			<RescheduleAppointment
				updateAppointment={() => {}}
				loading={false}
				selectedDate={new Date()}
			/>
		</>
	);
};

export default App;
