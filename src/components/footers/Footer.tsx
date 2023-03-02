import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
	const footerBgColor = useColorModeValue("gray.300", "gray.700");
	return (
		<>
			<Box width={"full"} bgColor={footerBgColor}>
				<Center>©2022 dende-h</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
