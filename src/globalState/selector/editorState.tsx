import { selector } from "recoil";
import { drafts } from "../atoms/drafts";

export type draftObject = {
	title: string;
	body: string;
	userName?: string;
	isSelected: boolean;
	maxLength: number;
	isPublished?: boolean;
	tag?: string[];
	lastEditedTime: Date;
};

export const editorState = selector({
	key: "editorState",
	get: ({ get }) => {
		const selectedDraftObject: draftObject = get(drafts).filter((item: draftObject) => item.isSelected)[0];

		return selectedDraftObject;
	}
});
