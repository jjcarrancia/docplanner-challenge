import { format } from "date-fns";
import { Appointment } from "src/containers/Appointments";

export const DAYS_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export interface GroupedAppointments {
	[key: string]: Appointment[];
}

export const initializeGroupedAppointments = (): GroupedAppointments => {
	const groupedAppointments: GroupedAppointments = {};
	DAYS_OF_WEEK.forEach((day) => {
		groupedAppointments[day] = [];
	});
	return groupedAppointments;
};

export const groupAppointmentsByDay = (
	appointments: Appointment[]
): GroupedAppointments => {
	const groupedAppointments = initializeGroupedAppointments();

	appointments.forEach((appointment) => {
		const day = format(new Date(appointment.Start), "EEEE");

		groupedAppointments[day].push(appointment);
	});

	return groupedAppointments;
};
