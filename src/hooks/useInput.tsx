import { useToast } from "@chakra-ui/react";
import { useState } from "react";

//inputフォームの入力を更新するためのカスタムフック
export const useInput = (props?: number) => {
	const toast = useToast();
	const [value, setValue] = useState("");

	const onChangeInputForm: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		toast.closeAll();
		if (props) {
			e.target.value.length > props
				? toast({ title: "文字数オーバーです", position: "top", isClosable: true, status: "error", duration: 3000 })
				: setValue(e.target.value);
		} else {
			setValue(e.target.value);
		}
	};
	return { onChangeInputForm, value, setValue };
};
