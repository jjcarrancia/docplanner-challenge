import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./index";

describe("ErrorBoundary", () => {
	it("should render children without error", () => {
		const { getByTestId } = render(
			<ErrorBoundary>
				<div data-testid="child-component">Child component</div>
			</ErrorBoundary>
		);
		expect(getByTestId("child-component")).not.toBeNull();
	});

	it("should display error message when a child component throws an error", () => {
		const ProblemChild = () => {
			throw new Error("Test error");
		};

		vi.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error

		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		);

		expect(screen.getByText("Sorry... there was an error")).not.toBeNull();

		(console.error as any).mockRestore();
	});

	it("should call componentDidCatch when a child component throws an error", () => {
		const ProblemChild = () => {
			throw new Error("Test error");
		};

		vi.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
		const componentDidCatchSpy = vi.spyOn(
			ErrorBoundary.prototype,
			"componentDidCatch"
		);

		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		);

		expect(componentDidCatchSpy).toHaveBeenCalled();

		// Restore mocks
		(console.error as any).mockRestore();
		componentDidCatchSpy.mockRestore();
	});
});
