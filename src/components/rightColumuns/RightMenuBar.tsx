import { Box, Center, Heading, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";
import { SlHome } from "react-icons/sl";
import { AiFillHome } from "react-icons/ai";

export const RightMenuBar = memo(() => {
	return (
		<>
			<IconButton aria-label="menuList" icon={<AiFillHome />} variant="ghost" colorScheme={"twitter"} size={"lg"} />
		</>
	);
});

RightMenuBar.displayName = "RightMenuBar";
