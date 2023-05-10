import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
	icon: JSX.Element;
	defaultColor?: string;
	changeColor?: string;
	bgColor?: string;
	focusOutline?: string;
	isDisableHoverAnimation?: boolean;
	boxsize?: number | string;
} & IconButtonProps;

export const PrimaryIconButton = memo((props: Props) => {
	const {
		icon,
		defaultColor,
		changeColor,
		bgColor,
		focusOutline,
		isDisableHoverAnimation,
		boxsize,
		...IconButtonProps
	} = props;

	return (
		<>
			<IconButton
				{...IconButtonProps}
				transitionProperty="all"
				transitionDuration="0.5s"
				transitionTimingFunction={"ease-out"}
				_hover={isDisableHoverAnimation ? { color: defaultColor } : { color: changeColor, fontSize: "24px" }}
				_focus={{ boxShadow: focusOutline }}
				icon={icon}
				color={defaultColor}
				backgroundColor={bgColor}
				border={"none"}
				borderRadius={"full"}
				boxSize={boxsize ? boxsize : 10}
			/>
		</>
	);
});
PrimaryIconButton.displayName = "PrimaryIconButton";
