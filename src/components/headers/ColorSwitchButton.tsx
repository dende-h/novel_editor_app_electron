import { IconButton, IconButtonProps, Tooltip, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorSwitchButton: React.FC<IconButtonProps> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const tooltipLabel = colorMode === "light" ? "ダークモードへ切り替えます" : "ライトモードへ切り替えます";
	return (
		<Tooltip label={tooltipLabel}>
			<IconButton {...props} icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} />
		</Tooltip>
	);
};
