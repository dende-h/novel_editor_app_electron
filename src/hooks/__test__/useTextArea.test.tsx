import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useTextArea } from "../useTextArea";

test("useTextArea returns the initial state", () => {
	const { result } = renderHook(() => useTextArea());

	expect(result.current.value).toEqual("");
	expect(result.current.charCount).toEqual(0);
});

test("useTextArea updates value and character count after onChange event", () => {
	const { result } = renderHook(() => useTextArea());
	const value = "This is a test";

	act(() => {
		result.current.onChangeTextArea({ target: { value } });
	});

	expect(result.current.value).toEqual(value);
	expect(result.current.charCount).toEqual(value.length);
});
