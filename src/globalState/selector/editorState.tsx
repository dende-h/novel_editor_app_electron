import { selector } from "recoil";
import { drafts } from "../atoms/drafts";

export type draftObject = {
	id: string;
	title: string;
	body: string;
	userName?: string;
	isSelected: boolean;
	lengthOver: boolean;
	isImageUpload: boolean;
	maxLength: number;
	isPublished?: boolean;
	tag?: string[];
	lastEditedTime: Date;
	imageUrl: string;
	imageName: string;
};

export const editorState = selector({
	key: "editorState",
	get: ({ get }) => {
		const selectedDraftObject: draftObject = get(drafts).filter((item: draftObject) => item.isSelected)[0];

		return selectedDraftObject;
	}
});
