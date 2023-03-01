import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import { useColorTheme } from "../../hooks/useColorTheme";

export const HeaderMenu = () => {
	const headerMenuBgColor = useColorModeValue("gray.800", "gray.300");
	const headerMenuHoverColor = useColorModeValue("gray.600", "gray.500");
	const headerBgColor = useColorModeValue("gray.300", "gray.700");
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
				bg={headerBgColor}
				color="gray.600"
				borderRadius="md"
				_hover={{ bg: "gray.500", color: "white" }}
				_active={{ bg: "gray.500", color: "white" }}
				position={"absolute"}
				top={{ base: 1, lg: 1 }}
				right={{ base: "5px", lg: "10px" }}
				size={{ base: "xs", md: "sm", lg: "md" }}
				zIndex={2}
			>
				Menu
			</MenuButton>
			<MenuList
				bgColor={headerMenuBgColor}
				color="white"
				borderRadius="md"
				boxShadow="md"
				p={2}
				_focus={{ outline: "none" }}
			>
				<MenuItem as={"a"} href={"/"} bgColor={headerMenuBgColor} _hover={{ bgColor: headerMenuHoverColor }}>
					Top
				</MenuItem>
				<MenuItem as={"a"} href={"/profile"} bgColor={headerMenuBgColor} _hover={{ bgColor: headerMenuHoverColor }}>
					Profile
				</MenuItem>
				<MenuItem bgColor={headerMenuBgColor} _hover={{ bgColor: headerMenuHoverColor }}>
					Draft Preview
				</MenuItem>
				<MenuItem bgColor={headerMenuBgColor} _hover={{ bgColor: headerMenuHoverColor }}>
					Novel Site
				</MenuItem>
				<MenuItem
					as={"a"}
					href={"https://notion-blog-nextjs-nine.vercel.app/"}
					target="_blank"
					rel="noopener noreferrer"
					bgColor={headerMenuBgColor}
					_hover={{ bgColor: headerMenuHoverColor }}
				>
					Blog
				</MenuItem>
				<MenuItem as={"a"} href="/contact" bgColor={headerMenuBgColor} _hover={{ bgColor: headerMenuHoverColor }}>
					お問い合わせフォーム
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
