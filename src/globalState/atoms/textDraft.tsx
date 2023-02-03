import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-persist",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const textDraftValue = atom({
	key: "textDraftValue",
	default: "",
	effects_UNSTABLE: [persistAtom]
});
