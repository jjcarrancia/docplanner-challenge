import { render } from "@testing-library/react";
import Appointments from "./index"; // Adjust the import path as needed
import { getWeeklySlots } from "src/services/availabilityService";
import { format } from "date-fns";
import { groupAppointmentsByDay } from "src/utils/appointmentUtils";

const mockGroupedAppointments = {
	Monday: [
		{
			doctor: "Dr. Simeon Molas",
			Start: "2021-05-17T10:30:00",
			End: "2021-05-17T10:40:00",
			Comments: "Additional instructions for the doctor",
			Patient: {
				Name: "Juan",
				SecondName: "Carrancia",
				Email: "example@email.com",
				Phone: "9876543210",
			},
		},
	],
};

vi.mock("src/services/availabilityService", () => ({
	getWeeklySlots: vi.fn(),
	bookSlot: vi.fn(),
}));

vi.mock("src/utils/appointmentUtils", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...(actual as any),
		groupAppointmentsByDay: vi.fn(),
	};
});
vi.mock("src/utils/dateUtils", () => ({
	formatDisplayDate: (date: Date) =>
		format(date, "EEEE, d MMMM yyyy 'at' HH:mm"),
	getMonday: (date: Date) => date,
}));

describe("Appointments Container", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		(getWeeklySlots as any).mockResolvedValue(mockGroupedAppointments);
		(groupAppointmentsByDay as any).mockResolvedValue(mockGroupedAppointments);
	});

	it("should render container correctly", async () => {
		const component = render(<Appointments />);
		expect(component).toMatchSnapshot();
	});
});
