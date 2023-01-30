/* eslint no-irregular-whitespace: 0 */

import { Dispatch, SetStateAction, useState } from "react";

type TextAreaHooks = () => {
	onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	charCount: number;
};

export const useTextArea: TextAreaHooks = () => {
	const [value, setValue] = useState("");
	const [charCount, setCharCount] = useState(0);

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
		const charArray = [...e.target.value].filter((char) => {
			return !char.match(/(\s+|　)/g);
		});
		setCharCount(charArray.length);
	};
	return { onChangeTextArea, value, setValue, charCount };
};
