import { CheckCircleIcon } from "@chakra-ui/icons";
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
	IconButton,
	Input,
	HStack,
	List,
	ListIcon,
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
import Index from "../../pages";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const AddTagsFormModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const displayDraft = useRecoilValue(editorState);
	const { setConposing, onEnterKeySubmitEvent } = useEnterKeyEvent();
	const toast = useToast();
	const maxLength = 15;
	const inputs = useInput(maxLength);
	const [tags, setTags] = useState<string[]>([]);
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);

	useEffect(() => {
		setTags(displayDraft.tag);
	}, [isOpen]);

	const onEnterKeyUp = () => {
		if (inputs.value.length === 0) {
			toast({
				title: "入力がありません",
				position: "top",
				isClosable: true,
				status: "error",
				duration: 3000
			});
		} else {
			onClickAddTagsButton();
		}
	};

	const onClickAddTagsButton = () => {
		const duplicateCheckArray = tags.filter((item) => {
			return item !== inputs.value;
		});
		if (tags.length > duplicateCheckArray.length) {
			toast({
				title: "Tagは重複することはできません",
				position: "top",
				isClosable: true,
				status: "error",
				duration: 3000
			});
		} else {
			const newTags = [...tags, inputs.value];
			const tagArrayMaxLength = 4;
			if (newTags.length < tagArrayMaxLength + 1) {
				setTags(newTags);
			} else {
				toast({
					title: "Tagは4つまでしか設定できません",
					position: "top",
					isClosable: true,
					status: "error",
					duration: 3000
				});
			}
		}

		inputs.setValue("");
	};

	const onClickSave = () => {
		setDraft(
			draft.map((item) => {
				return item.isSelected ? { ...item, tag: tags } : item;
			})
		);
		onClose();
	};

	const onClickTagDelete = (deleteIndex: number) => {
		setTags(tags.filter((_, index) => index !== deleteIndex));
	};

	return (
		<>
			<PrimaryIconButton
				icon={<ImPriceTags />}
				defaultColor={"twitter.500"}
				changeColor={"twitter.700"}
				bgColor={"gray.300"}
				aria-label="titleInput"
				focusOutline="none"
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
			/>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={"gray.300"}>
					<ModalHeader>Tag追加</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Center padding={2} marginBottom={2}>
							<HStack>
								<Input
									value={inputs.value}
									placeholder={"Add tags(12文字まで)"}
									onChange={inputs.onChangeInputForm}
									maxLength={maxLength}
									w={"300px"}
									backgroundColor={"gray.200"}
									onCompositionStart={() => {
										setConposing(true);
									}}
									onCompositionEnd={() => {
										setConposing(false);
									}}
									onKeyUp={(e) => {
										onEnterKeySubmitEvent(e, onEnterKeyUp);
									}}
								/>
								<PrimaryIconButton
									isDisabled={inputs.value.length === 0}
									isDisableHoverAnimation={inputs.value.length === 0}
									icon={<ImPlus />}
									defaultColor={"teal.400"}
									changeColor={"teal.600"}
									bgColor={"gray.300"}
									aria-label="addTagsButton"
									onClick={onClickAddTagsButton}
								/>
							</HStack>
						</Center>
						<List>
							<SimpleGrid columns={4}>
								{tags.map((item, index) => {
									return (
										<GridItem key={index}>
											<ListItem>
												<HStack spacing={0}>
													<PrimaryIconButton
														icon={<ImCancelCircle />}
														defaultColor="red.500"
														changeColor="red.500"
														bgColor={"gray.300"}
														onClick={(e) => onClickTagDelete(index)}
														aria-label="tagDelete"
														focusOutline="none"
													/>
													<Text fontStyle={"italic"} fontWeight={"bold"} color={"gray.700"}>
														{item}
													</Text>
												</HStack>
											</ListItem>
										</GridItem>
									);
								})}
							</SimpleGrid>
						</List>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClickSave}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
