import { IoIosAdd } from "react-icons/io";
import {
	useDisclosure,
	Button,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Input,
	DrawerFooter,
	IconButton,
	color
} from "@chakra-ui/react";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { LeftColumnArea } from "./LeftColumnArea";
import { ImMenu, ImPointUp } from "react-icons/im";

export const DrawerLeftArea = ({ colorScheme, size }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();

	// useEffect(() => {
	// 	onClose();
	// }, [isSelect]);

	const css = {
		overflow: "auto",
		scrollbarWidth: "none",
		webkitScrollbar: {
			width: "0",
			height: "0"
		}
	};

	return (
		<>
			<IconButton
				icon={<ImMenu />}
				aria-label="openDrawer"
				ref={btnRef}
				onClick={onOpen}
				colorScheme={colorScheme}
				borderRadius={2}
				size={size}
			/>

			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size={"sm"}>
				<DrawerOverlay />
				<DrawerContent backgroundColor={"gray.200"} sx={css}>
					<DrawerCloseButton />
					<DrawerHeader>List of Drafts</DrawerHeader>
					<DrawerBody>
						<LeftColumnArea />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
