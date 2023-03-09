import { useColorModeValue } from "@chakra-ui/react";

export const useColorTheme = () => {
	const colorValues = {
		headerBgColor: useColorModeValue("gray.300", "gray.700"),
		mainBgColor: useColorModeValue("gray.200", "gray.600"),
		draftCardBgColor: useColorModeValue("gray.300", "gray.700"),
		headerMenuBgColor: useColorModeValue("gray.800", "gray.300"),
		headerMenuHoverColor: useColorModeValue("gray.600", "gray.500")
	};
	return colorValues;
};
