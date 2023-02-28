import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, Link } from "@chakra-ui/react";

export const HeaderMenu = () => {
	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />} position={"absolute"} top={1} right={"30px"}>
				Actions
			</MenuButton>
			<MenuList>
				<MenuItem>Plofile</MenuItem>
				<MenuItem>DraftPreviwe</MenuItem>
				<MenuItem>NovelSite</MenuItem>
				<MenuItem
					as={"a"}
					href={"https://notion-blog-nextjs-nine.vercel.app/"}
					target="_blank"
					rel="noopener noreferrer"
				>
					Blog
				</MenuItem>
				<MenuItem as={"a"} href="/contact">
					お問い合わせフォーム
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
