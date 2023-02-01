/* eslint no-irregular-whitespace: 0 */

import { useCallback, useState } from "react";
import { numberOfCharacters } from "../constant/constant";

export type CalcCharCountHooks = () => {
	charCount: number;
	calcCharCount: (inputText: string) => void;
	isCharCountOverflow: boolean;
};

export const useCalcCharCount: CalcCharCountHooks = () => {
	const { veryShortNovel, shortShortNovel, shortNovel } = numberOfCharacters;
	const [charCount, setCharCount] = useState(0);
	const [isCharCountOverflow, setIsCharCountOverflow] = useState(false);

	const calcCharCount = useCallback((inputText: string) => {
		const charArray = [...inputText].filter((char) => {
			return !char.match(/(\s+|　)/g);
		});
		setCharCount(charArray.length);
		charArray.length > veryShortNovel ? setIsCharCountOverflow(true) : setIsCharCountOverflow(false);
	}, []);

	return { charCount, calcCharCount, isCharCountOverflow };
};
