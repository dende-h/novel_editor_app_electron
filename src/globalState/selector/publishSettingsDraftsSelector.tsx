import { selector } from "recoil";
import { draftObjectArray, drafts } from "../atoms/drafts";

export const publishSettingsDraftsSelector = selector({
	key: "publishedDraftsSelector",
	get: ({ get }) => {
		const draftsAll: draftObjectArray = get(drafts);

		const publishSettingsDrafts = draftsAll.filter((item) => {
			return item.isPublished;
		});

		return publishSettingsDrafts;
	}
});
