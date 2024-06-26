import { AVAILABILITY_API_URL } from "src/config";

export interface Appointment {
	End: string;
	Start: string;
	Taken: boolean;
}

// Interface for booking slot request
export interface BookSlotRequest {
	Start: string | null | undefined;
	End: string | null | undefined;
	Comments: string;
	Patient: {
		Name: string;
		SecondName: string;
		Email: string;
		Phone: string;
	};
}

// Function to retrieve weekly slots
export const getWeeklySlots = async (date: string): Promise<Appointment[]> => {
	try {
		const response = await fetch(
			`${AVAILABILITY_API_URL}/GetWeeklySlots/${date}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching weekly slots:", error);
		throw error;
	}
};

// Function to book a slot
export const bookSlot = async (data: BookSlotRequest) => {
	try {
		const response = await fetch(`${AVAILABILITY_API_URL}/BookSlot`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		} else {
			return response;
		}
	} catch (error) {
		console.error("Error booking slot:", error);
		throw error;
	}
};
