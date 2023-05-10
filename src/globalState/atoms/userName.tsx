import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-userName",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const userName = atom({
	key: "userName",
	default: "Ghost Writer",
	effects_UNSTABLE: [persistAtom]
});
