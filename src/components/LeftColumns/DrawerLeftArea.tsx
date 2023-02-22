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
	DrawerFooter
} from "@chakra-ui/react";
import { useRef } from "react";
import { LeftColumnArea } from "./LeftColumnArea";

export const DrawerLeftArea = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
				Open
			</Button>
			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
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
