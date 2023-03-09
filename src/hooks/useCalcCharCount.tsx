/* eslint no-irregular-whitespace: 0 */

import { useCallback, useState } from "react";

export type CalcCharCountHooks = () => {
	charCount: number;
	calcCharCount: (inputText: string, maxLength?: number) => void;
	isCharCountOverflow: boolean;
};

//本文の文字数をカウントするためのカスタムフック
export const useCalcCharCount: CalcCharCountHooks = () => {
	const [charCount, setCharCount] = useState(0); //文字数のカウント
	const [isCharCountOverflow, setIsCharCountOverflow] = useState(false); //文字数オーバーのフラグ

	//引数で受け取った文章を配列に分解して、マッチする文字のみ配列に再構成その配列のインデックスを文字数としてカウント
	const calcCharCount = useCallback((inputText: string, maxLength?: number) => {
		if (inputText !== undefined) {
			const charArray = [...inputText].filter((char) => {
				return !char.match(/(\s+|　)/g); //空白文字、全角半角スペース、改行は除外
			});
			setCharCount(charArray.length); //半角英数カナ、記号、全角文字をすべて1文字として計算
			//文字数オーバーフラグ切替
			if (!maxLength) return;
			charArray.length > maxLength ? setIsCharCountOverflow(true) : setIsCharCountOverflow(false);
		}
	}, []);

	return { charCount, calcCharCount, isCharCountOverflow };
};
