import { selector } from "recoil";
import Index from "../../pages";
import { draftObjectArray, drafts } from "../atoms/drafts";
import { tagSearchState } from "../atoms/tagSearchState";
import { draftObject } from "./editorState";
import { lastEditedTimeSort } from "./lastEditedTimeSort";

export const allTagsArray = selector({
	key: "allTagsArray",
	get: ({ get }) => {
		const draftTagsArray: string[][] = get(drafts).map((item: draftObject) => item.tag);
		const allDraftTagsArray = draftTagsArray.reduce((a, b) => {
			return a.concat(b);
		}, []);
		const filterDuplicatesAllDraftTags = allDraftTagsArray.filter((item, index) => {
			return allDraftTagsArray.indexOf(item) === index;
		});
		return filterDuplicatesAllDraftTags;
	}
});
