import React, { useState, useEffect, useCallback } from "react";
import { getWeeklySlots, bookSlot } from "src/services/availabilityService";
import { groupAppointmentsByDay } from "src/utils/appointmentUtils";
import { getMonday } from "src/utils/dateUtils";
import { format, startOfWeek, startOfDay, isAfter, addDays } from "date-fns";

const AppointmentDetails = React.lazy(
	() => import("src/components/AppointmentDetails")
);
const RescheduleAppointment = React.lazy(
	() => import("src/components/RescheduleAppointment")
);
const AppointmentTable = React.lazy(
	() => import("src/components/AppointmentTable")
);

export interface Patient {
	Name: string;
	SecondName: string;
	Email: string;
	Phone: string;
}

export interface Appointment {
	doctor: string;
	Start: string | null;
	End: string | null;
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
		[key: string]: Appointment[];
	}>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [appointment, setAppointment] =
		useState<Appointment>(initialAppointment);
	const [selectedNewAppointment, setSelectedNewAppointment] =
		useState<Appointment | null>(null);
	const [canGoBack, setCanGoBack] = useState<boolean>(false);

	const handleNextWeek = useCallback(() => {
		const nextWeek = new Date(currentWeek);
		nextWeek.setDate(currentWeek.getDate() + 7);
		setCurrentWeek(nextWeek);
	}, [currentWeek, setCurrentWeek]);

	const handlePrevWeek = useCallback(() => {
		const prevWeek = startOfWeek(addDays(currentWeek, -7), { weekStartsOn: 1 });
		setCurrentWeek(prevWeek);
	}, [currentWeek, setCurrentWeek]);

	useEffect(() => {
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

		fetchAppointments();

		const today = startOfDay(new Date());
		const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
		setCanGoBack(isAfter(startOfCurrentWeek, today));
	}, [currentWeek]);

	const updateAppointment = async () => {
		setLoading(true);
		const { doctor, ...data } = appointment;
		const result = await bookSlot({
			...data,
			Start: selectedNewAppointment?.Start,
			End: selectedNewAppointment?.End,
		});
		if (result.ok) {
			setAppointment({
				...appointment,
				Start: selectedNewAppointment?.Start || null,
				End: selectedNewAppointment?.End || null,
			});
			setSelectedNewAppointment(null);
		}
		setLoading(false);
	};

	return (
		<div>
			<AppointmentDetails appointment={appointment} loading={loading} />
			<AppointmentTable
				groupedAppointments={groupedAppointments}
				currentWeek={currentWeek}
				handleNextWeek={handleNextWeek}
				handlePrevWeek={handlePrevWeek}
				canGoBack={canGoBack}
				setSelectedNewAppointment={setSelectedNewAppointment}
			/>
			<RescheduleAppointment
				updateAppointment={updateAppointment}
				loading={loading}
				selectedDate={selectedNewAppointment?.Start || null}
			/>
		</div>
	);
};

export default Appointments;
