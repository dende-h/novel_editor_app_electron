import { useRecoilState, useSetRecoilState } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../globalState/atoms/drafts";
import { useCallback } from "react";
import { isSelected } from "../globalState/atoms/isSelected";

//タイトルエリアの編集時のカスタムフック
export const useDraft = () => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得
	const setIsSelect = useSetRecoilState(isSelected);

	//オブジェクト内のisSelectedプロパティにより処理を行う
	//isSelectedプロパティは配列内でtrueは常に一つであり重複しない。重複する場合想定する動作をしないため修正必要

	//タイトル入力エリアからフォーカスが離れた時の処理
	const onBlurFocusTitleInput = () => {
		//関数発火時にタイトル未入力の場合”無題”を挿入
		setDraft(draft.map((item) => (item.isSelected && item.title === "" ? { ...item, title: "無題" } : item)));
	};

	//タイトルの入力を受け取ってオブジェクトのタイトルプロパティを更新
	const onChangeTitleArea: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const editTime = new Date();
		const newTitle = e.target.value;
		setDraft(draft.map((item) => (item.isSelected ? { ...item, title: newTitle, lastEditedTime: editTime } : item)));
	};

	//本文の入力を受け取ってオブジェクトのボディプロパティを更新
	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		const editTime = new Date();
		const newBody = e.target.value;
		setDraft(draft.map((item) => (item.isSelected ? { ...item, body: newBody, lastEditedTime: editTime } : item)));
	};

	//draftObjectの削除処理
	const deleteAction = useCallback(() => {
		const newDraft = draft.filter((item) => item.isSelected === false);
		setDraft(newDraft);
		setIsSelect(false);
	}, []);

	return { deleteAction, onChangeTitleArea, onBlurFocusTitleInput, onChangeTextArea };
};
