import { Box, Center } from "@chakra-ui/react";
import { memo } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";

export const Footer = memo(() => {
	const bgColorValue = useColorTheme();
	return (
		<>
			<Box width={"full"} bgColor={bgColorValue.headerBgColor}>
				<Center>©2022 dende-h</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
