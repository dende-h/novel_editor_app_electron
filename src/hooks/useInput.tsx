import { useCallback, useState } from "react";

export const useInput = () => {
	const [value, setValue] = useState("");

	const onChangeInputForm: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		setValue(e.target.value);
	}, []);
	return { onChangeInputForm, value, setValue };
};
