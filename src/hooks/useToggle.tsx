import { useCallback, useState } from "react";

type Props = number[];

export const useToggle = (props?: Props) => {
	const [isOn, setIsOn] = useState(false);
	const [booleanArray, setBooleanArray] = useState<boolean[]>([]);

	const propsArray: number[] | undefined = props;

	const toggleOn = useCallback((callIndex?: number) => {
		if (props) {
			setBooleanArray(
				propsArray.map((item) => {
					return item === callIndex ? true : false;
				})
			);
		} else {
			setIsOn(true);
		}
	}, []);
	const toggleOff = useCallback(() => {
		if (props) {
			setBooleanArray(
				propsArray.map(() => {
					return false;
				})
			);
		} else {
			setIsOn(false);
		}
	}, []);

	return { toggleOn, isOn, toggleOff, booleanArray };
};
