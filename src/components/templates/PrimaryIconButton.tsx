import { IconButton, IconButtonProps } from "@chakra-ui/react";

type Props = {
	icon: JSX.Element;
	defaultColor?: string;
	changeColor?: string;
	bgColor?: string;
	focusOutline?: string;
	isDisableHoverAnimation?: boolean;
} & IconButtonProps;

export const PrimaryIconButton = (props: Props) => {
	const { icon, defaultColor, changeColor, bgColor, focusOutline, isDisableHoverAnimation, ...IconButtonProps } = props;

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
			/>
		</>
	);
};
