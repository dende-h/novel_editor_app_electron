import { selector } from "recoil";
import { draftObjectArray } from "../atoms/drafts";
import { tagSearchState } from "../atoms/tagSearchState";
import { lastEditedTimeSort } from "./lastEditedTimeSort";

export const viweDraftsSelector = selector({
	key: "viweDraftsSelector",
	get: ({ get }) => {
		const searchTags: string[] = get(tagSearchState);
		const draftArray: draftObjectArray = get(lastEditedTimeSort);
		const viweDrafts = searchTags
			.map((item) => {
				const findDraft = draftArray.filter((draft) => {
					return draft.tag.includes(item);
				});
				return findDraft;
			})
			.reduce((a, b) => {
				return a.concat(b);
			}, []);
		const filterDuplicatesViweDrafts = viweDrafts.filter((item, index) => {
			return viweDrafts.indexOf(item) === index;
		});

		return filterDuplicatesViweDrafts;
	}
});
