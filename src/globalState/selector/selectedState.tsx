import { selector } from "recoil";
import { draftObjectArray } from "../../components/LeftColumns/LeftColumnArea";
import { drafts } from "../atoms/drafts";

export const selectedState = selector({
	key: "selectedState",
	get: ({ get }) => {
		const draftArray: draftObjectArray = get(drafts);
		const selectedStateArray: boolean[] = draftArray.map((item) => item.isSelected);
		return selectedStateArray;
	}
});
