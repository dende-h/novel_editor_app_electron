import { Box, Heading } from "@chakra-ui/react";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";
import { HeaderMenu } from "./HeaderMenu";

export const Header = memo(() => {
	return (
		<>
			<Box textAlign={"center"} w={"full"} bgColor={"gray.300"} h={"auto"} p={1.5} position={"relative"}>
				<Box position={"absolute"} top={1} left={"30px"} display={{ base: "block", lg: "none" }}>
					<DrawerLeftArea colorScheme={"gray"} size={"xs"} />
				</Box>
				<Heading as={"h1"} fontFamily="heading" fontSize={{ base: "lg", md: "xl", lg: "xx-large" }}>
					“ NoA -novel aidor- ”
				</Heading>
				<HeaderMenu />
			</Box>
		</>
	);
});

Header.displayName = "Header";
