import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-userIntroduction",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const userIntroduction = atom({
	key: "userIntroduction",
	default: "",
	effects_UNSTABLE: [persistAtom]
});
