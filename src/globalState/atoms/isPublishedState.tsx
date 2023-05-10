import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-isPublished",
	storage: typeof window === "undefined" ? undefined : localStorage
});

export const isPublishedState = atom({
	key: "isPublished",
	default: false,
	effects_UNSTABLE: [persistAtom]
});
