/* eslint no-irregular-whitespace: 0 */

import { Dispatch, SetStateAction, useState } from "react";

export type TextAreaHooks = () => {
	onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	charCount: number;
	calcCharCount: (inputText: string) => void;
};

export const useTextArea: TextAreaHooks = () => {
	const [value, setValue] = useState("");
	const [charCount, setCharCount] = useState(0);

	const calcCharCount = (inputText: string) => {
		const charArray = [...inputText].filter((char) => {
			return !char.match(/(\s+|　)/g);
		});
		setCharCount(charArray.length);
	};

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};
	return { onChangeTextArea, value, setValue, charCount, calcCharCount };
};
