import React from "react";
import { formatDisplayDate } from "src/utils/dateUtils";
import { RescheduleButton } from "./styles";

interface RescheduleAppointmentProps {
	updateAppointment: () => Promise<void>;
	loading: boolean;
	selectedDate: Date | null | string;
}

const RescheduleAppointment: React.FC<RescheduleAppointmentProps> = ({
	updateAppointment,
	loading,
	selectedDate,
}) => {
	if (!selectedDate) return null;
	const formattedDate = formatDisplayDate(new Date(selectedDate));

	return (
		<>
			<p>
				<b>Reschedule</b>
				<br />
				Click the button to confirm
			</p>
			<RescheduleButton
				onClick={updateAppointment}
				disabled={!!loading}
				data-testid="reschedule-button"
			>
				{formattedDate}
			</RescheduleButton>
		</>
	);
};

export default RescheduleAppointment;
