/* eslint no-irregular-whitespace: 0 */

import { useRecoilState } from "recoil";
import { textDtaftValue } from "../globalState/atoms/textDraft";

export type TextAreaHooks = () => {
	onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
};

export const useTextArea: TextAreaHooks = () => {
	const [value, setValue] = useRecoilState(textDtaftValue);

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};
	return { onChangeTextArea, value };
};
