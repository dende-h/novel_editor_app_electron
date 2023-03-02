import { Box, Center, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";
import { ColorSwitchButton } from "./ColorSwitchButton";
import { HeaderMenu } from "./HeaderMenu";

export const Header = memo(() => {
	const headerBgColor = useColorModeValue("gray.300", "gray.700");

	return (
		<>
			<Center
				textAlign={"center"}
				w={"full"}
				bgColor={headerBgColor}
				h={"auto"}
				p={1.5}
				position={"relative"}
				zIndex={2}
			>
				<Box position={"absolute"} top={1} left={"30px"} display={{ base: "block", lg: "none" }}>
					<DrawerLeftArea colorScheme={"gray"} size={"xs"} />
				</Box>
				<Box>
					<Link href={"/"}>
						<Heading
							as={"h1"}
							fontSize={{ base: "md", md: "2xl", lg: "xx-large" }}
							_hover={{ opacity: 0.8, cursor: "pointer" }}
						>
							“ NoA -novel aidor- ”
						</Heading>
					</Link>
				</Box>
				<HStack position={"absolute"} top={{ base: 1, lg: 1 }} right={{ base: "3px", lg: "10px" }} zIndex={2}>
					<ColorSwitchButton aria-label={"darkTheme"} size={{ base: "xs", md: "sm", lg: "md" }} />
					<HeaderMenu />
				</HStack>
			</Center>
		</>
	);
});

Header.displayName = "Header";
