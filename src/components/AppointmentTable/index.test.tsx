import { render, screen, fireEvent } from "@testing-library/react";
import AppointmentTable from "./index"; // Adjust the import path as needed
import { startOfWeek } from "date-fns";
import { Appointment } from "src/containers/Appointments";

const mockAppointments: { [key: string]: Appointment[] } = {
	Monday: [
		{
			doctor: "Dr. John Doe",
			Start: "2024-06-24T10:30:00",
			End: "2024-06-24T10:40:00",
			Comments: "Initial consultation",
			Patient: {
				Name: "Jane",
				SecondName: "Doe",
				Email: "jane.doe@example.com",
				Phone: "1234567890",
			},
		},
	],
	Tuesday: [],
	Wednesday: [],
	Thursday: [],
	Friday: [],
	Saturday: [],
	Sunday: [],
};

const defaultProps = {
	groupedAppointments: mockAppointments,
	setSelectedNewAppointment: vi.fn(),
	handlePrevWeek: vi.fn(),
	handleNextWeek: vi.fn(),
	currentWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
	canGoBack: true,
};

describe("AppointmentTable Component", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should render correctly with given appointments", () => {
		const { queryByTestId } = render(<AppointmentTable {...defaultProps} />);

		expect(queryByTestId("data-container")).not.toBeNull();
	});

	it("should handle previous week button click", () => {
		const { queryByTestId } = render(<AppointmentTable {...defaultProps} />);

		const prevButton = queryByTestId("previous-week-button");
		if (prevButton) {
			fireEvent.click(prevButton);
			expect(defaultProps.handlePrevWeek).toHaveBeenCalled();
		}
	});

	it("should handle next week button click", () => {
		const { queryByTestId } = render(<AppointmentTable {...defaultProps} />);

		const nextButton = queryByTestId("next-week-button");
		if (nextButton) {
			fireEvent.click(nextButton);
			expect(defaultProps.handleNextWeek).toHaveBeenCalled();
		}
	});

	it("should handle slot click to select a new appointment", () => {
		const { getByText } = render(<AppointmentTable {...defaultProps} />);

		const slot = getByText("10:30");
		fireEvent.click(slot);

		expect(defaultProps.setSelectedNewAppointment).toHaveBeenCalledWith(
			mockAppointments["Monday"][0]
		);
	});

	it("should toggle table expansion", () => {
		const { queryByTestId, getByText } = render(
			<AppointmentTable {...defaultProps} />
		);

		const moreInfoButton = queryByTestId("more-info-button");
		if (moreInfoButton) {
			fireEvent.click(moreInfoButton);

			expect(getByText("Less")).not.toBeNull();
		} else {
			throw Error("More info button doesn't exist");
		}
	});

	it("should render null when groupedAppointments is empty", () => {
		const { container } = render(
			<AppointmentTable {...defaultProps} groupedAppointments={{}} />
		);

		expect(container.firstChild).toBeNull();
	});

	it("should disable previous week button if canGoBack is false", () => {
		render(<AppointmentTable {...defaultProps} canGoBack={false} />);

		const prevButton = screen.getByTestId("previous-week-button");
		expect(prevButton).toHaveProperty("disabled", true);
	});
});
