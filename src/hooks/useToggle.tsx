import { useCallback, useState } from "react";

export const useToggle = () => {
	const [isOn, setIsOn] = useState(false);
	const [booleanArray, setBooleanArray] = useState<boolean[]>([]);

	//isOnのStateを明示的に切り替える
	const toggleFlug = useCallback((isOnFulg: boolean) => setIsOn(isOnFulg), []);

	//引数を2つ受け取った場合、受け取った引数のインデックスだけtrueの配列を返す
	const toggleFlugOneOfTheArrays = useCallback((setArray: any[], callIndex?: number) => {
		if (callIndex !== undefined) {
			setBooleanArray(
				setArray.map((_, index) => {
					return index === callIndex ? true : false;
				})
			);
		} else {
			//引数１つの場合は全てFalseの配列を返す
			setBooleanArray(
				setArray.map(() => {
					return false;
				})
			);
		}
	}, []);

	return { toggleFlugOneOfTheArrays, isOn, toggleFlug, booleanArray };
};
