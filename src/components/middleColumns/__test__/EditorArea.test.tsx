import { fireEvent, render, screen } from "@testing-library/react";
import { EditorArea } from "../EditorArea";
import userEvent from "@testing-library/user-event";
import { act, renderHook } from "@testing-library/react-hooks";
import { useCalcCharCount } from "../../../hooks/useCalcCharCount";
import { Textarea } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

describe("render test", () => {
	it("テキストエリアへの入力と文字数の表示が変更されるか", () => {
		render(<EditorArea />, { wrapper: RecoilRoot }); //テキストエリアのコンポーネントをレンダリング

		const textValue = screen.getByPlaceholderText("Here is a sample placeholder"); //textbox要素取得
		expect(textValue.innerHTML).toBe(""); //初期値確認

		const charCountView = screen.getByText("現在の文字数", { exact: false }); //文字数表示のdiv要素取得
		expect(charCountView.innerHTML).toBe("現在の文字数：0"); //初期表示確認

		act(() => {
			userEvent.type(textValue, "this is a test"); //値を入力
		});

		expect(textValue.innerHTML).toBe("this is a test"); //変更後のテキストエリア
		expect(charCountView.innerHTML).toBe("現在の文字数：11"); //変更後の文字数表示
	});

	it("テキストの文字数を計算", () => {
		render(<EditorArea />, { wrapper: RecoilRoot });
		const { result } = renderHook(useCalcCharCount);

		expect(result.current.charCount).toBe(0);
		act(() => {
			//半角も全角も１文字カウント。空白除く。
			result.current.calcCharCount("aaaａａａあああ漢字 　111１１１ｱｱｱアアア+-*/[]{}「」？！?!💛");
		});

		expect(result.current.charCount).toBe(38); //全角半角記号すべて１文字計算。スペースは除外。
	});

	it("useTextAreaが動作しているか", () => {
		const { result } = renderHook(useTextArea, { wrapper: RecoilRoot });
		render(<Textarea onChange={result.current.onChangeTextArea} />); //内部コンポーネントのレンダリング
		const textValue = screen.getByRole("textbox");

		act(() => {
			//チェンジイベントの発火1回目
			fireEvent.change(textValue, { target: { value: "first changed" } });
		});
		expect(result.current.value).toBe("first changed"); //チェンジイベント後の値の確認

		act(() => {
			//チェンジイベントの発火2回目
			fireEvent.change(textValue, { target: { value: "second changed" } });
		});
		expect(result.current.value).toBe("second changed");

		act(() => {
			//チェンジイベントの発火3回目
			fireEvent.change(textValue, { target: { value: "third changed" } });
		});
		expect(result.current.value).toBe("third changed");
	});

	it("値の永続化しているか", () => {
		const { result } = renderHook(useTextArea, { wrapper: RecoilRoot });
		const { getByRole } = render(<Textarea onChange={result.current.onChangeTextArea} />); //内部コンポーネントのレンダリング

		act(() => {
			fireEvent.change(getByRole("textbox"), { target: { value: "this is a test" } });
		});
		expect(result.current.value).toBe("this is a test");

		//フック内の値を再取得
		const rerender = renderHook(useTextArea, { wrapper: RecoilRoot }).result;
		expect(rerender.current.value).toBe("this is a test");
	});
});
