import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-isSelected",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const isSelected = atom({
	key: "isSelected",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
