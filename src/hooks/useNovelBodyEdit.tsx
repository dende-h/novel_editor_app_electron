import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFlugArray } from "../globalState/atoms/selectedFlugArray";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";

export const useNovelBodyEdit = () => {
	const selectedFlug = useRecoilValue<boolean[]>(selectedFlugArray);
	const [value, setValue] = useRecoilState<draftObjectArray>(drafts);

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const selectedIndex = selectedFlug.indexOf(true);
		const newBody = e.target.value;
		setValue(value.map((item, index) => (index === selectedIndex ? { ...item, body: newBody } : item)));
	};
	return { onChangeTextArea };
};
