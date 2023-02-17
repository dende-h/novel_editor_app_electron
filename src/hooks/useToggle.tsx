import { useCallback, useState } from "react";

//真偽値のフラグ切替などに利用するカスタムフック
export const useToggle = () => {
	const [isOn, setIsOn] = useState(false);

	//isOnのStateを明示的に切り替える
	const toggleFlug = useCallback((isOnFulg: boolean) => setIsOn(isOnFulg), []);

	return { isOn, toggleFlug };
};
