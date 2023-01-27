import { render } from "@testing-library/react";
import { PrimaryIconButton } from "../PrimaryIconButton";
import "@testing-library/jest-dom";

describe("PrimaryIconButton", () => {
	it("renders without crashing", () => {
		const { container } = render(<PrimaryIconButton aria-label="Primary Button" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
