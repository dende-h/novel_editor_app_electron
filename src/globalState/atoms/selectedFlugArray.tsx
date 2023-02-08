import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultArray: boolean[] = [];

export const selectedFlugArray = atom({
	key: "selectedFlugArray",
	default: defaultArray,
	effects_UNSTABLE: [persistAtom]
});
