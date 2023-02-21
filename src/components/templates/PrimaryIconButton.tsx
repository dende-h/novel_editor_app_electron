import { IconButton, IconButtonProps } from "@chakra-ui/react";

type Props = {
	icon: JSX.Element;
	defaultColor: string;
	changeColor: string;
	bgColor: string;
} & IconButtonProps;

export const PrimaryIconButton = (props: Props) => {
	const { icon, defaultColor, changeColor, bgColor, ...IconButtonProps } = props;

	return (
		<>
			<IconButton
				{...IconButtonProps}
				transitionProperty="all"
				transitionDuration="0.8s"
				transitionTimingFunction={"ease-out"}
				_hover={{ color: changeColor, fontSize: "20px" }}
				_focus={{ color: changeColor, fontSize: "20px", boxShadow: "outline" }}
				icon={icon}
				color={defaultColor}
				backgroundColor={bgColor}
				border={"none"}
				borderRadius={"full"}
			/>
		</>
	);
};
