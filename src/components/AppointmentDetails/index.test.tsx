import { render } from "@testing-library/react";
import AppointmentDetails from "./index";

const mockAppointment = {
	doctor: "Dr. Simeon Molas",
	Start: new Date(2021, 4, 21, 10, 30).toString(),
};

describe("AppointmentDetails component", () => {
	it("should render doctor name and formatted date", () => {
		const { queryByTestId } = render(
			<AppointmentDetails loading={false} appointment={mockAppointment} />
		);

		const doctorText = queryByTestId("doctor-text");
		const spinner = queryByTestId("spinner");
		const calendarIcon = queryByTestId("calendar-icon");
		const formattedDate = queryByTestId("formatted-date");

		// Assert that the CalendarIcon is present and Spinner is not present
		expect(doctorText).not.toBeNull();
		expect(formattedDate?.getAttribute("class")).not.toContain("line-through");
		expect(spinner).toBeNull();
		expect(calendarIcon).not.toBeNull();
	});

	it("should render spinner when loading", () => {
		const { queryByTestId } = render(
			<AppointmentDetails loading={true} appointment={mockAppointment} />
		);
		const spinner = queryByTestId("spinner");
		const calendarIcon = queryByTestId("calendar-icon");
		const formattedDate = queryByTestId("formatted-date");

		// Assert the spinner is present and calendar icon is not when loading
		expect(formattedDate?.getAttribute("class")).toContain("line-through");
		expect(spinner).not.toBeNull();
		expect(calendarIcon).toBeNull();
	});
});
