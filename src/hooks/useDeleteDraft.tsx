import { useRecoilState } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";
import { useState } from "react";

//タイトルエリアの編集時のカスタムフック
export const useDeleteDraft = () => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const [isSelectedReset, setSelectedReset] = useState(false);

	//draftObjectの削除処理
	const deleteAction = () => {
		const newDraft = draft.filter((item) => item.isSelected === false);
		setDraft(newDraft);
	};
	return { deleteAction, isSelectedReset, setSelectedReset };
};
