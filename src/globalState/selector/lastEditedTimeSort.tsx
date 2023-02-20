import { selector } from "recoil";
import { draftObjectArray, drafts } from "../atoms/drafts";

export const lastEditedTimeSort = selector({
	key: "lastEditedTimeSort",
	get: ({ get }) => {
		const draftArray: draftObjectArray = get(drafts);
		const lastEditedTimeSortArray: draftObjectArray = [...draftArray].sort(
			(a, b) => b.lastEditedTime.getTime() - a.lastEditedTime.getTime()
		);
		return lastEditedTimeSortArray;
	}
});
