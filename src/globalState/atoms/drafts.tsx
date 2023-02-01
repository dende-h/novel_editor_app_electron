import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { draftObjectArray } from "../../components/LeftColumns/LeftColumnArea";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultArray: draftObjectArray = [];

export const drafts = atom({
	key: "drafts",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
