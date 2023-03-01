import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	HStack,
	List,
	ListItem,
	SimpleGrid,
	GridItem,
	useToast,
	Center,
	Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImCancelCircle, ImPlus, ImPriceTags } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../../globalState/atoms/drafts";
import { editorState } from "../../globalState/selector/editorState";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { useInput } from "../../hooks/useInput";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const ChangeUserNameModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				colorScheme={"teal"}
				onClick={onOpen}
				size={{ base: "xs", md: "sm", lg: "md" }}
				fontSize={{ base: "2xs", md: "sm", lg: "lg" }}
				margin={1}
			>
				Change Name
			</Button>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
				<ModalOverlay />
				<ModalContent
					backgroundColor={"gray.700"}
					borderRadius={"md"}
					border={"1px"}
					borderColor={"gray.800"}
					boxShadow={"lg"}
				>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"} color={"white"}>
						ペンネームを変更する
					</ModalHeader>
					<ModalCloseButton color={"white"} />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2} marginBottom={2}>
							<Input bg={"gray.800"} color={"white"} placeholder={"新しいペンネームを入力してください"} />
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button onClick={onClose} variant={"ghost"} color={"white"} _hover={{ bg: "gray.600" }}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
