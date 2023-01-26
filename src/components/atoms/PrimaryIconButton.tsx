import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = IconButtonProps;

export const PrimaryIconButton: VFC<Props> = memo((props) => {
	const { ...IconButtonProps } = props;
	return (
		<>
			<IconButton {...IconButtonProps} />
		</>
	);
});

PrimaryIconButton.displayName = "PrimaryIconButton"