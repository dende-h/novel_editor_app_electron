import { useCallback, useRef, useState } from "react";

//Inputなどでエンターキーを押した際のFocus移動のためのカスタムフック
export const useFocusEvent = () => {
	const [conposing, setConposing] = useState<boolean>(false); //onEnterKeyUpの発火処理フラグ
	const focus = useRef<HTMLTextAreaElement>(null); //タイトル入力から本文エリアへのフォーカス移動用

	const focusEvent = () => {
		focus.current.focus();
	};

	//タイトル編集時エンターが押された場合フォーカスを本文エリアに移動
	const onEnterKeyUp: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
		//日本語入力時の変換のエンターの場合は処理しない
		if (conposing === false) {
			if (e.key === "Enter") {
				focusEvent();
			}
		}
	}, []);

	return { setConposing, onEnterKeyUp, focus };
};
