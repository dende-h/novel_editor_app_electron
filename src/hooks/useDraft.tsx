import { useRecoilState } from "recoil";
import { drafts } from "../globalState/atoms/drafts";
import { draftObjectArray } from "../components/LeftColumns/LeftColumnArea";
import { useCallback } from "react";

//タイトルエリアの編集時のカスタムフック
export const useDraft = () => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts); //下書きのオブジェクトを配列で取得

	//オブジェクト内のisSelectedプロパティにより処理を行う
	//isSelectedプロパティは配列内でtrueは常に一つであり重複しない。重複する場合想定する動作をしないため修正必要

	//タイトル入力エリアからフォーカスが離れた時の処理
	const onBlurFocusTitleInput = () => {
		//関数発火時にタイトル未入力の場合”無題”を挿入
		setDraft(draft.map((item) => (item.isSelected && item.title === "" ? { ...item, title: "無題" } : item)));
	};

	//タイトルの入力を受け取ってオブジェクトのタイトルプロパティを更新
	const onChangeTitleArea: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		const newTitle = e.target.value;
		setDraft(draft.map((item) => (item.isSelected ? { ...item, title: newTitle } : item)));
	}, []);

	//本文の入力を受け取ってオブジェクトのボディプロパティを更新
	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
		const newBody = e.target.value;
		setDraft(draft.map((item) => (item.isSelected ? { ...item, body: newBody } : item)));
	}, []);

	//draftObjectの削除処理
	const deleteAction = useCallback(() => {
		const newDraft = draft.filter((item) => item.isSelected === false);
		setDraft(newDraft);
	}, []);

	return { deleteAction, onChangeTitleArea, onBlurFocusTitleInput, onChangeTextArea };
};
