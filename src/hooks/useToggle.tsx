import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { draftArrayIndex } from "../globalState/selector/draftArrayIndex";

export const useToggle = () => {
	const [isOn, setIsOn] = useState(false);
	const [booleanArray, setBooleanArray] = useState<boolean[]>([]);
	const indexArray = useRecoilValue<number[]>(draftArrayIndex);

	const toggleOn = useCallback(
		(callIndex?: number) => {
			setBooleanArray(
				indexArray.map((item) => {
					return item === callIndex ? true : false;
				})
			);
		},
		[indexArray]
	);

	const toggleOff = useCallback(() => {
		setBooleanArray(
			indexArray.map(() => {
				return false;
			})
		);
	}, [indexArray]);

	return { toggleOn, isOn, toggleOff, booleanArray };
};
