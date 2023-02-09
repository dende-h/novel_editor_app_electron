import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFlugArray } from "../globalState/atoms/selectedFlugArray";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";
import { useState } from "react";

export const useNovelTitleEdit = () => {
	const selectedFlug = useRecoilValue<boolean[]>(selectedFlugArray);
	const [title, setTitle] = useRecoilState<draftObjectArray>(drafts);
	const [conposing, setConposing] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const onEnterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (conposing === false) {
			if (e.key === "Enter") {
				const selectedIndex = selectedFlug.indexOf(true);
				setTitle(
					title.map((item, index) => (index === selectedIndex && item.title === "" ? { ...item, title: "無題" } : item))
				);
				setIsFocus(true);
			}
		}
	};

	const onChangeTitleArea: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const selectedIndex = selectedFlug.indexOf(true);
		const newTitle = e.target.value;
		setTitle(title.map((item, index) => (index === selectedIndex ? { ...item, title: newTitle } : item)));
	};
	return { onChangeTitleArea, setTitle, title, setConposing, onEnterKeyDown, isFocus, setIsFocus };
};
