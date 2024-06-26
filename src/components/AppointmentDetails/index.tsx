import React from "react";
import { DateCard, Spinner, CalendarIcon } from "./styles";
import { formatDisplayDate } from "src/utils/dateUtils";
import { Appointment } from "src/containers/Appointments";

interface AppointmentDetailsProps {
	loading: boolean;
	appointment: Appointment;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
	loading,
	appointment,
}) => {
	const { doctor, Start } = appointment;
	const formattedDate = formatDisplayDate(Start);

	return (
		<>
			<p data-testid="doctor-text">
				Confirm your appointment with <b>{doctor}</b>
			</p>
			<DateCard>
				{loading ? (
					<Spinner data-testid="spinner" />
				) : (
					<CalendarIcon data-testid="calendar-icon" />
				)}
				<span
					className={`${loading ? "line-through" : ""}`}
					data-testid="formatted-date"
				>
					On {formattedDate}
				</span>
			</DateCard>
			<p>
				<b>Did you have an unexpected situation?</b>
				<br />
				You can change the appointment for when it suits you better
			</p>
		</>
	);
};

export default AppointmentDetails;
