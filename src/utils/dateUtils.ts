import { format } from "date-fns";

export const formatDisplayDate = (date: Date | null): string => {
	if (!date) return "";
	return format(date, "EEEE, d MMMM yyyy 'at' HH:mm");
};
