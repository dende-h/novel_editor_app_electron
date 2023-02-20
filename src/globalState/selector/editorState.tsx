import { selector } from "recoil";
import { drafts } from "../atoms/drafts";
import { selectedState } from "./selectedState";

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
		const selected = get(selectedState).indexOf(true);
		const selectedDraftObject: draftObject = get(drafts)[selected];
		return selectedDraftObject;
	}
});
