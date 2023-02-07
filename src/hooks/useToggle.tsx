import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { draftArrayIndex } from "../globalState/selector/draftArrayIndex";

export const useToggle = () => {
	const [isOn, setIsOn] = useState(false);
	const [booleanArray, setBooleanArray] = useState<boolean[]>([]);
	const indexArray = useRecoilValue<number[]>(draftArrayIndex);

	//isOnのStateを明示的に切り替える
	const toggleFlug = useCallback((isOnFulg: boolean) => setIsOn(isOnFulg), []);

	//引数を受け取った場合、受け取った引数のインデックスだけtrueの配列を返す
	const toggleFlugOneOfTheArrays = useCallback(
		(callIndex?: number) => {
			if (callIndex) {
				setBooleanArray(
					indexArray.map((item) => {
						return item === callIndex ? true : false;
					})
				);
			} else {
				//引数がない場合は全てFalseの配列を返す
				setBooleanArray(
					indexArray.map(() => {
						return false;
					})
				);
			}
		},
		[indexArray]
	);

	return { toggleFlugOneOfTheArrays, isOn, toggleFlug, booleanArray };
};
