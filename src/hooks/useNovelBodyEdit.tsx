import { useRecoilState, useRecoilValue } from "recoil";
import { selectedFlugArray } from "../globalState/atoms/selectedFlugArray";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";

//本文エリアの変更を更新するカスタムフック
export const useNovelBodyEdit = () => {
	const selectedFlug = useRecoilValue<boolean[]>(selectedFlugArray); //現在編集しているオブジェクトを判定するフラグ配列を取得
	const [value, setValue] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const selectedIndex = selectedFlug.indexOf(true); //現在編集しているオブジェクトのインデックスを取得する
		const newBody = e.target.value;
		//配列オブジェクトのなかで、取得したインデックスの本文を更新
		setValue(value.map((item, index) => (index === selectedIndex ? { ...item, body: newBody } : item)));
	};
	return { onChangeTextArea };
};
