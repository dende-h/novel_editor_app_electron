import { render, screen } from "@testing-library/react";
import { EditorArea } from "../EditorArea";
import userEvent from "@testing-library/user-event";

describe("render test", () => {
	it("EditorAreaの表示", () => {
		render(<EditorArea />);
		const placeholder = screen.getByPlaceholderText("Here is a sample placeholder");
		expect(placeholder).toBeTruthy;
	});

	it("テキストエリアへの入力", () => {
		render(<EditorArea />);
		const textValue = screen.getByRole("textbox");
		userEvent.type(textValue, "this is a test");
		expect(textValue).toBeInTheDocument;
	});
});
