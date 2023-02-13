import { useState } from "react";

//Inputなどでエンターキーを押した際のFocus移動のためのカスタムフック
export const useFocusEvent = () => {
	const [conposing, setConposing] = useState<boolean>(false); //onEnterKeyDownの発火処理フラグ
	const [isFocus, setIsFocus] = useState<boolean>(false); //フォーカスのフラグ

	//タイトル編集時エンターが押された場合フォーカスを本文エリアに移動
	const onEnterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		//日本語入力時の変換のエンターの場合は処理しない
		if (conposing === false) {
			if (e.key === "Enter") {
				setIsFocus(true); //フォーカスのイベントを発火させるフラグ
			}
		}
	};

	return { setConposing, onEnterKeyDown, isFocus, setIsFocus };
};
