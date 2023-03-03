/* eslint-disable no-irregular-whitespace */
import { selector } from "recoil";
import { userProfileItem } from "../../constant/constant";
import { draftObjectArray, drafts } from "../atoms/drafts";
import { userName } from "../atoms/userName";

const profileHeading = userProfileItem;

export const profileItem = selector({
	key: "profileItem",
	get: ({ get }) => {
		const userPenName: string = get(userName);
		const draftsArray: draftObjectArray = get(drafts);
		const totalNumberOfDrafts: number = draftsArray.length;
		const numberOfPublishedDrafts: number = draftsArray.filter((item) => {
			return item.isPublished === true;
		}).length;
		const totalNumberOfCharactersInTheDrafts: number = draftsArray
			.map((item) => {
				const charArray = [...item.body].filter((char) => {
					return !char.match(/(\s+|　)/g); //空白文字、全角半角スペース、改行は除外
				}).length;
				return charArray ? charArray : 0;
			})
			.reduce((a, b) => a + b, 0);

		const description = [userPenName, totalNumberOfDrafts, numberOfPublishedDrafts, totalNumberOfCharactersInTheDrafts];
		const prfileArray = profileHeading.map((item, index) => {
			return { heading: item, description: description[index] };
		});

		return prfileArray;
	}
});
