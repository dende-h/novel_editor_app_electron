import { selector } from "recoil";
import { drafts } from "../atoms/drafts";
import { selectedFlugArray } from "../atoms/selectedFlugArray";

export type draftObject = { title: string; body: string; userName?: string };

export const editorState = selector({
	key: "editorState",
	get: ({ get }) => {
		const selected: number = get(selectedFlugArray).indexOf(true);
		const selectedDraftObject: draftObject = get(drafts)[selected];
		return selectedDraftObject;
	}
});
