import { format, startOfWeek, parseISO } from "date-fns";

export const formatDisplayDate = (date: Date | null): string => {
	if (!date) return "";
	return format(date, "EEEE, d MMMM yyyy 'at' HH:mm");
};

// This method gets the monday of the week based on a given date.
export const getMonday = (date: Date) => {
	return startOfWeek(date, { weekStartsOn: 1 });
};

// Format date to show the time for appointments
export const formatTime = (dateString: string): string => {
	const date = parseISO(dateString);
	return format(date, "HH:mm");
};
