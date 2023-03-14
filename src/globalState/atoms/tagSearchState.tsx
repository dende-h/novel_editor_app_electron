import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultValue: string[] = [];

export const tagSearchState = atom({
	key: "tagSearchState",
	default: defaultValue,
	effects_UNSTABLE: [persistAtom]
});
