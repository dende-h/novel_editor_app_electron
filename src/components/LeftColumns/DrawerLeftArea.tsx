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
import { useEffect, useRef, useState } from "react";
import { LeftColumnArea } from "./LeftColumnArea";
import { ImMenu } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";

export const DrawerLeftArea = ({ colorScheme, size }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const isSelect = useRecoilValue(isSelected);
	const btnRef = useRef();

	// useEffect(() => {
	// 	onClose();
	// }, [isSelect]);

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
				<DrawerContent backgroundColor={"gray.200"}>
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
