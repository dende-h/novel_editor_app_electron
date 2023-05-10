import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";

export const HeaderMenu = memo(() => {
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
						<Link href={"/"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Top
							</MenuItem>
						</Link>
						<Link href={"/profile"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Profile
							</MenuItem>
						</Link>
						<Link href={"/drafts"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Draft Preview
							</MenuItem>
						</Link>
						<Link href={"https://next-novel-site.vercel.app/"} passHref target="_blank" rel="noopener noreferrer">
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Lit:Bite
							</MenuItem>
						</Link>
						<Link
							href={"https://notion-blog-nextjs-nine.vercel.app/"}
							passHref
							target="_blank"
							rel="noopener noreferrer"
						>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								Blog
							</MenuItem>
						</Link>

						<Link href={"/contact"} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								お問い合わせフォーム
							</MenuItem>
						</Link>
						<Link
							href={
								"https://perpetual-hemisphere-7a3.notion.site/How-to-use-Write-Novel-Now-a746fd05c74a42cda7bd15fb2886b580"
							}
							passHref
							target="_blank"
							rel="noopener noreferrer"
						>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								How to use
							</MenuItem>
						</Link>
					</MenuList>
				</>
			)}
		</Menu>
	);
});
HeaderMenu.displayName = "HeaderMenu";
