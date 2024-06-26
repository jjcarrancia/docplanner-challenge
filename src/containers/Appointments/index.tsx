import React, { useState, useEffect } from "react";
import { getWeeklySlots } from "src/services/availabilityService";
import { groupAppointmentsByDay } from "src/utils/appointmentUtils";
import { getMonday } from "src/utils/dateUtils";
import { format, startOfWeek } from "date-fns";

const AppointmentDetails = React.lazy(
	() => import("src/components/AppointmentDetails")
);
const RescheduleAppointment = React.lazy(
	() => import("src/components/RescheduleAppointment")
);

export interface Patient {
	Name: string;
	SecondName: string;
	Email: string;
	Phone: string;
}

export interface Appointment {
	doctor: string;
	Start: string;
	End: string;
	Comments: string;
	Patient: Patient;
}

const initialAppointment = {
	doctor: "Dr. Simeon Molas",
	Start: new Date(2021, 4, 21, 10, 30).toString(),
	End: new Date(2021, 4, 21, 10, 40).toString(),
	Comments: "Additional instructions for the doctor",
	Patient: {
		Name: "Juan",
		SecondName: "Carrancia",
		Email: "example@email.com",
		Phone: "9876543210",
	},
};

const Appointments: React.FC = () => {
	const [currentWeek, setCurrentWeek] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	);
	const [groupedAppointments, setGroupedAppointments] = useState<{
		[key: string]: any[];
	}>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [appointment, setAppointment] =
		useState<Appointment>(initialAppointment);

	const fetchAppointments = async () => {
		try {
			const monday = format(getMonday(currentWeek), "yyyyMMdd");
			const appointments = await getWeeklySlots(monday);
			const grouped = groupAppointmentsByDay(appointments);
			setGroupedAppointments(grouped);
		} catch (error) {
			console.error("Error fetching appointments:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, [currentWeek]);

	const updateAppointment = () => {
		console.log("update appointment");
	};

	return (
		<div>
			<AppointmentDetails appointment={appointment} loading={loading} />
			<RescheduleAppointment
				updateAppointment={updateAppointment}
				loading={loading}
				selectedDate={appointment.Start}
			/>
		</div>
	);
};

export default Appointments;
