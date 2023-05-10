import { useRecoilState } from "recoil";
import { userIntroduction } from "../globalState/atoms/userIntroduction";

export const useUserIntroductionInput = () => {
	const [textValue, setTextValue] = useRecoilState(userIntroduction);

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setTextValue(e.target.value);
	};
	return { textValue, setTextValue, onChangeTextArea };
};
