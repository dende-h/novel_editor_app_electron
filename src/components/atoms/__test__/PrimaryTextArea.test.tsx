import React from "react";
import { render, screen } from "@testing-library/react";
import { PrimaryTextArea } from "../PrimaryTextArea";
import "@testing-library/jest-dom";

describe("PrimaryTextArea", () => {
	it("should render a textarea", () => {
		render(<PrimaryTextArea />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument();
	});

	it("should accept a value prop", () => {
		const value = "Test value";
		render(<PrimaryTextArea value={value} />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue(value);
	});

	it("should update when the value prop changes", () => {
		const { rerender } = render(<PrimaryTextArea value={"foo"} />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("foo");

		rerender(<PrimaryTextArea value={"bar"} />);
		expect(textarea).toHaveValue("bar");
	});
});
