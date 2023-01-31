/* eslint no-irregular-whitespace: 0 */

import { Dispatch, SetStateAction, useState } from "react";

export type TextAreaHooks = () => {
	onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
};

export const useTextArea: TextAreaHooks = () => {
	const [value, setValue] = useState("");

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};
	return { onChangeTextArea, value };
};
