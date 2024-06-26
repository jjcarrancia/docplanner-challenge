import { describe, it, vi, expect } from "vitest";
import { getWeeklySlots, bookSlot } from "./availabilityService"; // Adjust the import path as needed
import { AVAILABILITY_API_URL } from "src/config";

describe("availabilityService", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getWeeklySlots", () => {
		it("should fetch weekly slots successfully", async () => {
			const mockDate = "2024-06-24";
			const mockResponse = { slots: ["slot1", "slot2"] };

			global.fetch = vi.fn(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockResponse),
				} as Response)
			);

			const result = await getWeeklySlots(mockDate);
			expect(fetch).toHaveBeenCalledWith(
				`${AVAILABILITY_API_URL}/GetWeeklySlots/${mockDate}`
			);
			expect(result).toEqual(mockResponse);
		});

		it("should throw an error if the network response is not ok", async () => {
			const mockDate = "2024-06-24";

			global.fetch = vi.fn(() =>
				Promise.resolve({
					ok: false,
				} as Response)
			);

			await expect(getWeeklySlots(mockDate)).rejects.toThrow(
				"Network response was not ok"
			);
			expect(fetch).toHaveBeenCalledWith(
				`${AVAILABILITY_API_URL}/GetWeeklySlots/${mockDate}`
			);
		});

		it("should throw an error if fetch fails", async () => {
			const mockDate = "2024-06-24";

			global.fetch = vi.fn(() => Promise.reject(new Error("Fetch failed")));

			await expect(getWeeklySlots(mockDate)).rejects.toThrow("Fetch failed");
			expect(fetch).toHaveBeenCalledWith(
				`${AVAILABILITY_API_URL}/GetWeeklySlots/${mockDate}`
			);
		});
	});

	describe("bookSlot", () => {
		it("should book a slot successfully", async () => {
			const mockData = { slot: "slot1", user: "user1" };
			const mockResponse = { ok: true };

			global.fetch = vi.fn(() =>
				Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockResponse),
				} as Response)
			);

			const result = await bookSlot(mockData);
			expect(fetch).toHaveBeenCalledWith(`${AVAILABILITY_API_URL}/BookSlot`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(mockData),
			});
			expect(result).toEqual(expect.objectContaining({ ok: true }));
		});

		it("should throw an error if the network response is not ok", async () => {
			const mockData = { slot: "slot1", user: "user1" };

			global.fetch = vi.fn(() =>
				Promise.resolve({
					ok: false,
				} as Response)
			);

			await expect(bookSlot(mockData)).rejects.toThrow(
				"Network response was not ok"
			);
			expect(fetch).toHaveBeenCalledWith(`${AVAILABILITY_API_URL}/BookSlot`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(mockData),
			});
		});

		it("should throw an error if fetch fails", async () => {
			const mockData = { slot: "slot1", user: "user1" };

			global.fetch = vi.fn(() => Promise.reject(new Error("Fetch failed")));

			await expect(bookSlot(mockData)).rejects.toThrow("Fetch failed");
			expect(fetch).toHaveBeenCalledWith(`${AVAILABILITY_API_URL}/BookSlot`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(mockData),
			});
		});
	});
});
