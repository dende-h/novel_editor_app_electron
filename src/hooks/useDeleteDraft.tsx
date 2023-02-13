import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedFlugArray } from "../globalState/atoms/selectedFlugArray";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";
import { isSelectedReset } from "../globalState/atoms/isSelectedReset";
import { useState } from "react";

//タイトルエリアの編集時のカスタムフック
export const useDeleteDraft = () => {
	const selectedFlug = useRecoilValue<boolean[]>(selectedFlugArray); //表示対象のフラグを配列で取得
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const [isSelectedReset, setSelectedReset] = useState(false);

	//draftObjectの削除処理
	const deleteAction = () => {
		const selectedIndex = selectedFlug.indexOf(true); //現在選択中のオブジェクトのインデックスを取得する
		const newDraft = draft.filter((_, index) => index !== selectedIndex);
		setDraft(newDraft);
		setSelectedReset(true);
	};
	return { deleteAction, isSelectedReset, setSelectedReset };
};
