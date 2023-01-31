import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const textDtaftValue = atom({
	key: "textDtaftValue",
	default: "",
	effects_UNSTABLE: [persistAtom]
});
