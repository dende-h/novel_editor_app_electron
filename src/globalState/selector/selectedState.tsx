import { selector } from "recoil";
import { draftObjectArray, drafts } from "../atoms/drafts";

export type selectedStateArray = boolean[];

export const selectedState = selector({
	key: "selectedState",
	get: ({ get }) => {
		const draftArray: draftObjectArray = get(drafts);
		const selectedStateArray: selectedStateArray = draftArray.map((item) => item.isSelected);
		return selectedStateArray;
	}
});
