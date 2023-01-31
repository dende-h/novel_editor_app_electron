/* eslint no-irregular-whitespace: 0 */

import { useState } from "react";

export type CalcCharCountHooks = () => {
	charCount: number;
	calcCharCount: (inputText: string) => void;
};

export const useCalcCharCount: CalcCharCountHooks = () => {
	const [charCount, setCharCount] = useState(0);

	const calcCharCount = (inputText: string) => {
		const charArray = [...inputText].filter((char) => {
			return !char.match(/(\s+|　)/g);
		});
		setCharCount(charArray.length);
	};

	return { charCount, calcCharCount };
};
