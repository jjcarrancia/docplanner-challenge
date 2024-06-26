import { render, fireEvent } from "@testing-library/react";
import RescheduleAppointment from "./index";

const updateAppointmentMock = vi.fn();
const mockAppointment = {
	Start: new Date(2021, 4, 21, 10, 30).toString(),
	End: new Date(2021, 4, 21, 10, 40).toString(),
};

describe("RescheduleAppointment component", () => {
	it("should return null if there's no appointment selected", () => {
		const { queryByTestId } = render(
			<RescheduleAppointment
				selectedDate={null}
				updateAppointment={updateAppointmentMock}
				loading={false}
			/>
		);

		const button = queryByTestId("reschedule-button");
		expect(button).toBeNull();
	});

	it("should be able to click the button if there's a selected appointment", () => {
		const { queryByTestId } = render(
			<RescheduleAppointment
				selectedDate={mockAppointment.Start}
				updateAppointment={updateAppointmentMock}
				loading={false}
			/>
		);

		const button = queryByTestId("reschedule-button");
		expect(button).toHaveProperty("disabled", false);
		expect(button).not.toBeNull();

		if (button) {
			fireEvent.click(button);
			expect(updateAppointmentMock).toHaveBeenCalled();
		} else {
			throw new Error("Button not found");
		}
	});

	it("should return the button disabled if it's loading", () => {
		const { queryByTestId } = render(
			<RescheduleAppointment
				selectedDate={mockAppointment.Start}
				updateAppointment={updateAppointmentMock}
				loading={true}
			/>
		);

		const button = queryByTestId("reschedule-button");
		expect(button).toHaveProperty("disabled", true);
	});
});
