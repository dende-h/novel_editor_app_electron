/* eslint-disable no-irregular-whitespace */
import format from "date-fns/format";
import { selector } from "recoil";
import { userProfileItem } from "../../constant/constant";
import { draftObjectArray, drafts } from "../atoms/drafts";
import { publishedCount } from "../atoms/publishedCount";
import { userName } from "../atoms/userName";
import { lastEditedTimeSort } from "./lastEditedTimeSort";
import { publishSettingsDraftsSelector } from "./publishSettingsDraftsSelector";

const profileHeading = userProfileItem;

export const profileItem = selector({
	key: "profileItem",
	get: ({ get }) => {
		const userPenName: string = get(userName);
		const draftsArray: draftObjectArray = get(drafts);
		const totalNumberOfDrafts: number = draftsArray.length;
		const numberOfPublishedDrafts: number = get(publishSettingsDraftsSelector).length;
		const published: number = get(publishedCount);
		const totalNumberOfCharactersInTheDrafts: number = draftsArray
			.map((item) => {
				const charArray = [...item.body].filter((char) => {
					return !char.match(/(\s+|　)/g); //空白文字、全角半角スペース、改行は除外
				}).length;
				return charArray ? charArray : 0;
			})
			.reduce((a, b) => a + b, 0);
		const lastEditedDay = get(lastEditedTimeSort).map((item) => {
			return format(new Date(item.lastEditedTime), "yyyy/MM/dd");
		})[0];

		const description = [
			userPenName,
			totalNumberOfDrafts,
			numberOfPublishedDrafts,
			published,
			totalNumberOfCharactersInTheDrafts,
			lastEditedDay
		];
		const profileArray = profileHeading.map((item, index) => {
			return { heading: item, description: description[index] };
		});

		return profileArray;
	}
});
