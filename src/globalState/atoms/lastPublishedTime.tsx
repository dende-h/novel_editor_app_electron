import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-lastPublishedTime",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const initialValue = "No novels in public";

export const lastPublishedTime = atom({
	key: "lastPublishedTime",
	default: initialValue,
	effects_UNSTABLE: [persistAtom]
});
