import { render, screen } from "@testing-library/react";
import { EditorArea } from "../EditorArea";
import userEvent from "@testing-library/user-event";
import { act, renderHook } from "@testing-library/react-hooks";
import { useTextArea } from "../../../hooks/useTextArea";

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
		expect(textValue.innerHTML).toBe("this is a test");
	});

	it("テキストの文字数を計算", () => {
		render(<EditorArea />);
		let { result } = renderHook(useTextArea);
		expect(result.current.charCount).toBe(0);
		act(() => {
			result.current.calcCharCount("aaa　あああ 111１１１ ｱｱｱ アアア　漢字 +-*/[]{}「」？！?!　💛"); //半角も全角も１文字カウント。空白除く。
		});
		expect(result.current.charCount).toBe(35);
	});

	it("文字数の表示がされているか", () => {
		render(<EditorArea />);
		const textValue = screen.getByRole("textbox");
		const charCountView = screen.getByText("現在の文字数", { exact: false });
		expect(charCountView.innerHTML).toBe("現在の文字数：0");
		userEvent.type(textValue, "12345");
		expect(charCountView.innerHTML).toBe("現在の文字数：5");
	});
});
