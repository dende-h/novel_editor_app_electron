import { Box, Center, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";
import { HeaderMenu } from "./HeaderMenu";

export const Header = memo(() => {
	return (
		<>
			<Center textAlign={"center"} w={"full"} bgColor={"gray.300"} h={"auto"} p={1.5} position={"relative"}>
				<Box position={"absolute"} top={1} left={"30px"} display={{ base: "block", lg: "none" }}>
					<DrawerLeftArea colorScheme={"gray"} size={"xs"} />
				</Box>
				<Box>
					<Link href={"/"}>
						<Heading fontSize={{ base: "lg", md: "2xl", lg: "xx-large" }} _hover={{ opacity: 0.8, cursor: "pointer" }}>
							“ NoA -novel aidor- ”
						</Heading>
					</Link>
				</Box>
				<Box>
					<HeaderMenu />
				</Box>
			</Center>
		</>
	);
});

Header.displayName = "Header";
