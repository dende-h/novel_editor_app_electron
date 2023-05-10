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
	Center,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { ImCancelCircle, ImPlus, ImPriceTags } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../../globalState/atoms/drafts";
import { editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { useInput } from "../../hooks/useInput";
import { useToastTemplate } from "../../hooks/useToastTemplate";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

//タグを追加するためのフォームモーダル
export const AddTagsFormModal = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const displayDraft = useRecoilValue(editorState);
	const { setConposing, onEnterKeySubmitEvent } = useEnterKeyEvent();
	const { praimaryErrorToast } = useToastTemplate();
	const { onChangeInputForm, value, setValue } = useInput();
	const [tags, setTags] = useState<string[]>([]);
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const [isChanged, setIsChanged] = useState(false);
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const { calcCharCount, charCount } = useCalcCharCount();
	const maxLength = 12;

	useEffect(() => {
		setIsChanged(false);
		setTags(displayDraft.tag);
	}, [isOpen]);

	//フォーム入力でエンターキーを押したあとの動作
	const onEnterKeyUp = () => {
		if (value.length === 0) {
			praimaryErrorToast("入力がありません");
		} else {
			onClickAddTagsButton();
		}
	};

	const onCloseModal = () => {
		setValue("");
		onClose();
	};

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	const onClickAddTagsButton = () => {
		const duplicateCheckArray = tags.filter((item) => {
			return item !== value;
		});
		if (tags.length > duplicateCheckArray.length) {
			praimaryErrorToast("重複することはできません");
		} else {
			const newTags = [...tags, value];
			const tagArrayMaxLength = 4;
			if (newTags.length < tagArrayMaxLength + 1) {
				setTags(newTags);
			} else {
				praimaryErrorToast("Tagは4つまでしか設定できません");
			}
		}
		setIsChanged(true);
		setValue("");
	};

	const onClickSave = () => {
		setDraft(
			draft.map((item) => {
				return item.isSelected ? { ...item, tag: tags } : item;
			})
		);
		onCloseModal();
	};

	const onClickTagDelete = (deleteIndex: number) => {
		setTags(tags.filter((_, index) => index !== deleteIndex));
		setIsChanged(true);
	};

	return (
		<>
			<PrimaryIconButton
				icon={<ImPriceTags />}
				colorScheme={"teal"}
				aria-label="titleInput"
				focusOutline="none"
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
			/>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor}>
					<ModalHeader>Tag追加</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Center padding={2} marginBottom={2}>
							<HStack position={"relative"} zIndex={1}>
								<Input
									value={value}
									placeholder={"追加するタグを入力して下さい"}
									onChange={onChangeInputForm}
									maxLength={maxLength}
									overflow={"hidden"}
									w={"300px"}
									onCompositionStart={() => {
										setConposing(true);
									}}
									onCompositionEnd={() => {
										setConposing(false);
									}}
									onKeyUp={(e) => {
										onEnterKeySubmitEvent(e, onEnterKeyUp);
									}}
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
								/>
								<PrimaryIconButton
									isDisabled={value.length === 0}
									isDisableHoverAnimation={value.length === 0}
									icon={<ImPlus />}
									colorScheme={"twitter"}
									aria-label="addTagsButton"
									onClick={onClickAddTagsButton}
								/>
								<Text position={"absolute"} top={2} left={"245px"} zIndex={2}>
									{charCount}/{maxLength}
								</Text>
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
														colorScheme={"red"}
														onClick={() => onClickTagDelete(index)}
														aria-label="tagDelete"
														focusOutline="none"
														variant={"ghost"}
														boxsize={5}
													/>
													<Text
														w={"12em"}
														fontStyle={"italic"}
														fontWeight={"bold"}
														fontSize={{ base: "13px", md: "14px", lg: "24px" }}
														textOverflow={"ellipsis"}
														overflow={"hidden"}
														whiteSpace={"nowrap"}
													>
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
						<Button colorScheme="blue" mr={3} onClick={onClickSave} isDisabled={!isChanged}>
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
AddTagsFormModal.displayName = "AddTagsFormModal";
