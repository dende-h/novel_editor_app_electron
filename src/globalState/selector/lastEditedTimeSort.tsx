import { selector } from "recoil";
import { draftObjectArray, drafts } from "../atoms/drafts";

export const lastEditedTimeSort = selector({
	key: "lastEditedTimeSort",
	get: ({ get }) => {
		const draftArray: draftObjectArray = get(drafts);
		const lastEditedTimeSortArray: draftObjectArray = [...draftArray].sort((a, b) => {
			const aTime = a.lastEditedTime instanceof Date ? a.lastEditedTime.getTime() : 0;
			const bTime = b.lastEditedTime instanceof Date ? b.lastEditedTime.getTime() : 0;
			return bTime - aTime;
		});
		return lastEditedTimeSortArray;
	}
});
