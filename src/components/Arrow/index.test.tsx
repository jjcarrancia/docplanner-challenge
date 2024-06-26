import { render } from "@testing-library/react";
import Arrow from "./index";

describe("Arrow component", () => {
	it("renders Arrow component with default props", () => {
		const { getByTestId } = render(<Arrow />);
		const arrowSvg = getByTestId("arrow-svg");
		const arrowPath = arrowSvg.querySelector("path");
		expect(arrowSvg).not.toBeNull();
		expect(arrowSvg.style.transform).toBe("rotate(-90deg)");
		expect(arrowPath?.getAttribute("fill")).toBe("#0f0f0f");
	});

	it('renders Arrow component with direction="up"', () => {
		const { getByTestId } = render(<Arrow direction="up" />);
		const arrowSvg = getByTestId("arrow-svg");
		expect(arrowSvg).not.toBeNull();
		expect(arrowSvg.style.transform).toBe("rotate(-90deg)");
	});

	it('renders Arrow component with direction="down"', () => {
		const { getByTestId } = render(<Arrow direction="down" />);
		const arrowSvg = getByTestId("arrow-svg");
		expect(arrowSvg).not.toBeNull();
		expect(arrowSvg.style.transform).toBe("rotate(90deg)");
	});

	it('renders Arrow component with direction="right"', () => {
		const { getByTestId } = render(<Arrow direction="right" />);
		const arrowSvg = getByTestId("arrow-svg");
		expect(arrowSvg).not.toBeNull();
		expect(arrowSvg.style.transform).toBe("rotate(0deg)");
	});

	it('renders Arrow component with direction="left"', () => {
		const { getByTestId } = render(<Arrow direction="left" />);
		const arrowSvg = getByTestId("arrow-svg");
		expect(arrowSvg).not.toBeNull();
		expect(arrowSvg.style.transform).toBe("rotate(180deg)");
	});

	it('renders Arrow component with fillColor="#ff0000"', () => {
		const { getByTestId } = render(<Arrow fillColor="#ff0000" />);
		const arrowSvg = getByTestId("arrow-svg");
		const arrowPath = arrowSvg.querySelector("path");
		expect(arrowSvg).not.toBeNull();
		expect(arrowPath?.getAttribute("fill")).toBe("#ff0000");
	});
});
