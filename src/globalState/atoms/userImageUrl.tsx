import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
	key: "recoil-userImageUrl",
	storage: typeof window === "undefined" ? undefined : localStorage
});

const defaultImage = { url: "", fileName: "" };

export const userImageUrl = atom({
	key: "userImageUrl",
	default: defaultImage,
	effects_UNSTABLE: [persistAtom]
});
