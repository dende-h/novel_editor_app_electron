import { selector } from "recoil";
import { drafts } from "../atoms/drafts";
import { selectedFlugArray } from "../atoms/selectedFlugArray";

export const editorState = selector({
	key: "editorState",
	get: ({ get }) => {
		const selected = get(selectedFlugArray).indexOf(true);
		const selectedDraftObject = get(drafts)[selected];
		return selectedDraftObject;
	}
});
