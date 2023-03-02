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
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ImCancelCircle, ImPlus, ImPriceTags } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../../globalState/atoms/drafts";
import { editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { useInput } from "../../hooks/useInput";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const ChangeUserNameModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const { onSetUserName } = useDraft();
	const { onChangeInputForm, value, setValue } = useInput(20);

	const onSave = () => {
		onSetUserName(value);
		setValue("");
		onClose();
	};

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
				<ModalContent backgroundColor={backgroundColor} borderRadius={"md"} border={"1px"} boxShadow={"lg"}>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"}>
						ペンネームを変更する
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2} marginBottom={2}>
							<Input
								_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
								placeholder={"新しいペンネームを入力してください"}
								onChange={onChangeInputForm}
							/>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onSave}>
							Save
						</Button>
						<Button onClick={onClose} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
