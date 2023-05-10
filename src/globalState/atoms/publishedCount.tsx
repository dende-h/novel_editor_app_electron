import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-publishedCount",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const publishedCount = atom({
	key: "publishedCount",
	default: 0,
	effects_UNSTABLE: [persistAtom]
});
