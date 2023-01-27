import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { EditorArea } from "../EditorArea";

describe("EditorArea test", () => {
	let renderer;

	beforeEach(() => {
		renderer = render(<EditorArea />);
	});

	it("should render the correct text in the text area and the correct character count", () => {
		const { getByPlaceholderText } = renderer;
		const textArea = getByPlaceholderText("Here is a sample placeholder");

		act(() => {
			fireEvent.change(textArea, { target: { value: "This is a test" } });
		});

		expect(textArea.value).toBe("This is a test");
	});
});
