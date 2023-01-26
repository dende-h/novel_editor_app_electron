import { Input, InputProps } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = InputProps;

export const PrimaryInput: VFC<Props> = memo((props) => {
	const { ...InputProps } = props;
	return (
		<>
			<Input {...InputProps} />
		</>
	);
});
