import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { draftObject } from "../selector/editorState";

export type draftObjectArray = draftObject[];

const { persistAtom } = recoilPersist({
	key: "recoil-indexeddb",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultObjectArray: draftObjectArray = [];

export const drafts = atom({
	key: "drafts",
	default: defaultObjectArray,
	effects_UNSTABLE: [persistAtom]
});
