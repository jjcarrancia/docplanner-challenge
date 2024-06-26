import React, { useState } from "react";
import {
	TableWrapper,
	GridWrapper,
	Slot,
	Header,
	BubbleButton,
	DataContainer,
	Table,
	MoreInfoButton,
} from "./styles";
import { DAYS_OF_WEEK } from "src/utils/appointmentUtils";
import { formatTime } from "src/utils/dateUtils";
import Arrow from "src/components/Arrow";
import { format, addDays, isToday, isTomorrow } from "date-fns";
import { Appointment } from "src/containers/Appointments";

interface AppointmentTableProps {
	groupedAppointments: { [key: string]: Appointment[] };
	setSelectedNewAppointment: (appointment: Appointment) => void;
	handlePrevWeek: () => void;
	handleNextWeek: () => void;
	currentWeek: any;
	canGoBack: boolean;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
	groupedAppointments,
	setSelectedNewAppointment,
	handlePrevWeek,
	handleNextWeek,
	currentWeek,
	canGoBack,
}) => {
	const [expandedTable, setExpandedTable] = useState(false);

	if (!!groupedAppointments && Object.keys(groupedAppointments).length === 0) {
		return null;
	}

	return (
		<TableWrapper>
			<Table>
				<BubbleButton
					onClick={handlePrevWeek}
					data-testid="previous-week-button"
					disabled={!canGoBack}
				>
					<Arrow fillColor="#2a61a9" direction="left" />
				</BubbleButton>
				<DataContainer
					className={expandedTable ? "expanded" : "collapsed"}
					data-testid="data-container"
				>
					<GridWrapper>
						{DAYS_OF_WEEK.map((day, idx) => {
							const showDay = addDays(currentWeek, idx);
							const today = isToday(showDay);
							const tomorrow = isTomorrow(showDay);

							return (
								<div key={day}>
									<Header>
										<span>
											{(today && "Today") || (tomorrow && "Tomorrow") || day}
										</span>
										<br />
										<span>{format(showDay, "d MMM")}</span>
									</Header>

									{groupedAppointments[day].map((apt: any) => {
										const formattedTime = formatTime(apt.Start);
										return (
											<Slot
												key={apt.Start}
												onClick={() => setSelectedNewAppointment(apt)}
												className={`${apt.Taken ? "taken" : ""}`}
												disabled={apt.Taken}
											>
												{formattedTime}
											</Slot>
										);
									})}
								</div>
							);
						})}
					</GridWrapper>
				</DataContainer>
				<BubbleButton onClick={handleNextWeek} data-testid="next-week-button">
					<Arrow fillColor="#2a61a9" direction="right" />
				</BubbleButton>
			</Table>
			<MoreInfoButton
				onClick={() => setExpandedTable(!expandedTable)}
				data-testid="more-info-button"
			>
				<p>{expandedTable ? "Less" : "See more hours"}</p>
				<Arrow fillColor="#2a61a9" direction={expandedTable ? "up" : "down"} />
			</MoreInfoButton>
		</TableWrapper>
	);
};

export default AppointmentTable;
