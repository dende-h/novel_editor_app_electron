import { Box, Heading } from "@chakra-ui/react";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";

export const Header = memo(() => {
	return (
		<>
			<Box textAlign={"center"} w={"full"} bgColor={"gray.300"} h={"auto"} p={1.5} position={"relative"}>
				<Box position={"absolute"} top={1} left={"30px"} display={{ base: "block", lg: "none" }}>
					<DrawerLeftArea colorScheme={"gray"} size={"xs"} />
				</Box>
				<Heading as={"h1"} fontFamily="heading" fontSize={{ base: "xl", lg: "xx-large" }}>
					“ NoA -novel aidor- ”
				</Heading>
			</Box>
		</>
	);
});

Header.displayName = "Header";
