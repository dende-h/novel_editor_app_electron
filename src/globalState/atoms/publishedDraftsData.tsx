import localforage from "localforage";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type draftData = { id: string; goodMark: number };

const { persistAtom } = recoilPersist({
	key: "recoil-publishedDraftsData",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultArray: draftData[] = [];

export const publishedDraftsData = atom({
	key: "publishedDraftsData",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
