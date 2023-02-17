import { useRecoilState, useRecoilValue } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";

//本文エリアの変更を更新するカスタムフック
export const useNovelBodyEdit = () => {
	const [value, setValue] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const newBody = e.target.value;
		//配列オブジェクトのなかで、取得したインデックスの本文を更新
		setValue(value.map((item) => (item.isSelected ? { ...item, body: newBody } : item)));
	};
	return { onChangeTextArea };
};
