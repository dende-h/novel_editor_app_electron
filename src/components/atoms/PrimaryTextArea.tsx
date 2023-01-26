import { Textarea, TextareaProps } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = TextareaProps;

export const PrimaryTextArea: VFC<Props> = memo((props) => {
	const { ...TextareaProps } = props;
	return (
		<>
			<Textarea {...TextareaProps} />
		</>
	);
});

PrimaryTextArea.displayName = "PrimaryTextArea"