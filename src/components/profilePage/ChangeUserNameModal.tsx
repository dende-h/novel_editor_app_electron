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
	Center,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useInput } from "../../hooks/useInput";

export const ChangeUserNameModal = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const { onSetUserName } = useDraft();
	const { onChangeInputForm, value, setValue } = useInput();
	const { calcCharCount, charCount } = useCalcCharCount();
	const maxLength = 15;

	const onSave = () => {
		onSetUserName(value);
		setValue("");
		onClose();
	};

	const onCloseModal = () => {
		setValue("");
		onClose();
	};

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	return (
		<>
			<Button
				colorScheme={"teal"}
				onClick={onOpen}
				size={{ base: "xs", md: "sm", lg: "md" }}
				fontSize={{ base: "xs", md: "sm", lg: "lg" }}
				margin={1}
			>
				Change Name
			</Button>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} borderRadius={"md"} border={"1px"} boxShadow={"lg"}>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"}>
						ペンネームを変更する
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2}>
							<HStack>
								<Input
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
									placeholder={"新しいペンネームを入力してください"}
									onChange={onChangeInputForm}
									maxLength={maxLength}
									w={"300px"}
									overflow={"hidden"}
								/>
								<Text>
									{charCount}/{maxLength}
								</Text>
							</HStack>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={charCount === 0}>
							Save
						</Button>
						<Button onClick={onCloseModal} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
ChangeUserNameModal.displayName = "ChangeUserNameModal";
