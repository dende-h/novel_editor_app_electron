import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";

export const HeaderMenu = () => {
	const headerMenuHoverColor = useColorModeValue("gray.500", "gray.700");
	const headerBgColor = useColorModeValue("gray.300", "gray.700");

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						as={Button}
						rightIcon={isOpen ? <ChevronUpIcon boxSize={4} /> : <ChevronDownIcon boxSize={4} />}
						bg={headerBgColor}
						borderRadius="md"
						_hover={{ bg: "gray.500", color: "white" }}
						_active={{ bg: "gray.500", color: "white" }}
						size={"sm"}
					>
						{isOpen ? "Close" : "Menu"}
					</MenuButton>
					<MenuList
						bgColor={"gray.800"}
						color="white"
						borderRadius="md"
						boxShadow="md"
						p={2}
						_focus={{ outline: "none" }}
					>
						<MenuItem as={"a"} href={"/"} bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
							Top
						</MenuItem>
						<MenuItem as={"a"} href={"/profile"} bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
							Profile
						</MenuItem>
						<MenuItem as={"a"} href={"/drafts"} bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
							Draft Preview
						</MenuItem>
						<MenuItem as={"a"} href={"/commingsoon"} bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
							Novel Site
						</MenuItem>
						<MenuItem
							as={"a"}
							href={"https://notion-blog-nextjs-nine.vercel.app/"}
							target="_blank"
							rel="noopener noreferrer"
							bgColor={"gray.800"}
							_hover={{ bgColor: headerMenuHoverColor }}
						>
							Blog
						</MenuItem>
						<MenuItem as={"a"} href="/contact" bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
							お問い合わせフォーム
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};
