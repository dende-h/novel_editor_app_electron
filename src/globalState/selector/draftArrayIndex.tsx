import { selector } from "recoil";
import { drafts } from "../atoms/drafts";

export const draftArrayIndex = selector({
	key: "draftArrayIndex",
	get: ({ get }) => {
		const indexArray = get(drafts).map((_,index) =>index)
		return indexArray;
	}
});
