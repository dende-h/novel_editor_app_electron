import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";

export const Header = memo(() => {
	return (
		<>
			<Box position={"fixed"} top={1} left={2} display={{ base: "block", md: "none" }}>
				<DrawerLeftArea />
			</Box>
			<Box textAlign={"center"}>“ NoA -novel aidor- ”</Box>
		</>
	);
});

Header.displayName = "Header";
