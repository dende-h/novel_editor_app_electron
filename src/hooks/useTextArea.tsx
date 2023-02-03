import { useRecoilState } from "recoil";
import { textDraftValue } from "../globalState/atoms/textDraft";

export type TextAreaHooks = () => {
	onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
};

export const useTextArea: TextAreaHooks = () => {
	const [value, setValue] = useRecoilState(textDraftValue);

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};
	return { onChangeTextArea, value };
};
