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
				w={"auto"}
				bgColor={headerBgColor}
				h={"40px"}
				p={1.5}
				position={"relative"}
				zIndex={2}
			>
				<Box position={"absolute"} top={"4px"} left={"10px"} display={{ base: "block", lg: "none" }}>
					<HeaderMenu />
				</Box>
				<Box>
					<Link href={"/"}>
						<Heading
							as={"h1"}
							fontSize={{ base: "md", md: "xl", lg: "2xl" }}
							_hover={{ opacity: 0.8, cursor: "pointer" }}
						>
							“ NoA -novel aidor- ”
						</Heading>
					</Link>
				</Box>
				<HStack
					position={"absolute"}
					spacing={2}
					top={"4px"}
					right={"10px"}
					zIndex={2}
					display={{ base: "block", lg: "none" }}
				>
					<ColorSwitchButton aria-label={"darkTheme"} size={"sm"} borderRadius={"full"} />
					<DrawerLeftArea colorScheme={"gray"} size={"sm"} />
				</HStack>
			</Center>
		</>
	);
});

Header.displayName = "Header";
