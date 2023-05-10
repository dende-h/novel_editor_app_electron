import {
	Box,
	Button,
	FormControl,
	HStack,
	IconButton,
	Input,
	Text,
	Textarea,
	useColorModeValue,
	VStack
} from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { ImCross, ImPlus } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { SelectMaxLengthSlider } from "./SelectMaxLengthSlider";
import useUndoableState from "../../hooks/useUndoableState";
import { IoIosUndo, IoIosRedo } from "react-icons/io";

export const EditorArea = memo(() => {
	const {
		onChangeTitleArea,
		onBlurFocusTitleInput,
		onChangeTextArea,
		onCopy,
		hasCopied,
		onLengthOver,
		onAddNovel,
		selectStateReset
	} = useDraft(); //Draftオブジェクトの操作hooks
	const { focus, onEnterKeyFocusEvent, setConposing } = useEnterKeyEvent();
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [bodyMaxLength, setBodyMaxLength] = useState<number>(0);
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const isClient = useRecoilValue(isClientState);
	const init = { text: selectedDraft ? selectedDraft.body : "" };

	const {
		state: doc,
		setState: setDoc,
		resetState: resetDoc,
		index: docStateIndex,
		lastIndex: docStateLastIndex,
		goBack: undoDoc,
		goForward: redoDoc
	} = useUndoableState(init);
	const canUndo = docStateIndex > 1;
	const canRedo = docStateIndex < docStateLastIndex;

	useEffect(() => {
		onChangeTextArea(doc.text);
	}, [doc]);

	useEffect(() => {
		setDoc(selectedDraft ? { text: selectedDraft.body } : { text: "" });
		calcCharCount(selectedDraft ? selectedDraft.body : "", selectedDraft ? selectedDraft.maxLength : 0);
		setBodyMaxLength(selectedDraft ? selectedDraft.maxLength : 0);
		if (!selectedDraft) {
			resetDoc(init);
		}
	}, [selectedDraft]);

	useEffect(() => {
		onLengthOver(isCharCountOverflow);
	}, [charCount]);

	const editorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.shiftKey && event.key === "Z") {
				event.preventDefault();
				undoDoc();
			} else if (event.shiftKey && event.key === "Y") {
				event.preventDefault();
				redoDoc();
			}
		};

		const editor = editorRef.current;
		if (editor) {
			editor.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			if (editor) {
				editor.removeEventListener("keydown", handleKeyDown);
			}
		};
	}, [undoDoc, redoDoc]);

	return (
		<>
			{isClient ? (
				selectedDraft ? (
					<Box p={{ base: 2, md: 3, lg: 4, xl: 6 }} w={"auto"} position={"relative"} zIndex={1} h={"90vh"}>
						<VStack spacing={4}>
							<VStack>
								<Text fontSize={{ base: "sm", md: "md" }}>{`タイトル : ${selectedDraft.title.length} / 30文字`}</Text>
								<Input
									fontSize={{ base: "md", md: "lg" }}
									value={selectedDraft.title}
									onChange={onChangeTitleArea}
									border={"none"}
									borderRadius={0}
									width={"auto"}
									onCompositionStart={() => setConposing(true)}
									onCompositionEnd={() => {
										setConposing(false);
									}}
									onKeyUp={onEnterKeyFocusEvent} //KeyDownだとテキストエリアに改行が入ってしまうのでUp
									placeholder="novel title"
									textAlign={"center"}
									maxLength={30}
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
									transitionProperty="all"
									transitionDuration="1.0s"
									transitionTimingFunction={"ease-out"}
									onBlur={onBlurFocusTitleInput}
									autoFocus={selectedDraft.title === "" ? true : false}
								/>
							</VStack>
							<VStack w={"85%"} spacing={0}>
								<Text textColor={isCharCountOverflow && "red"} fontSize={{ base: "sm", md: "md" }}>
									現在の文字数 : {charCount} / {bodyMaxLength} 文字
								</Text>
								<SelectMaxLengthSlider maxLength={bodyMaxLength} />
							</VStack>
							<Box zIndex={1} w={"100%"} h={"100%"} textAlign={"center"} position={"relative"} ref={editorRef}>
								<Textarea
									fontSize={{ base: "sm", lg: "md" }}
									placeholder="Enter the text of your novel here"
									width={"85%"}
									height={{ base: "77vh", lg: "75vh" }}
									resize={"none"}
									borderRadius={0}
									border={"none"}
									value={doc.text}
									isInvalid={isCharCountOverflow}
									ref={focus}
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "none" }}
									transitionProperty="all"
									transitionDuration="1.0s"
									transitionTimingFunction={"ease-out"}
									autoFocus={selectedDraft.title !== "" ? true : false}
									paddingY={10}
									paddingX={{ base: 4, lg: 8 }}
									onChange={(e) => {
										setDoc({ text: e.target.value });
									}}
								/>
								<HStack position={"absolute"} top={"1%"} left={"8%"} zIndex={2}>
									<IconButton
										aria-label="undo"
										icon={<IoIosUndo />}
										onClick={() => undoDoc()}
										isDisabled={!canUndo}
										borderRadius={"full"}
										colorScheme={canUndo ? "teal" : "gray"}
										size={"sm"}
										variant={"ghost"}
									/>
									<IconButton
										aria-label="redo"
										icon={<IoIosRedo />}
										onClick={() => redoDoc()}
										isDisabled={!canRedo}
										borderRadius={"full"}
										colorScheme={canRedo ? "teal" : "gray"}
										size={"sm"}
										variant={"ghost"}
									/>
								</HStack>

								<Text
									fontFamily={"heading"}
									fontSize={{ base: "11px", md: "12px", lg: "13px" }}
									_hover={{ fontSize: "14px", cursor: "pointer" }}
									fontStyle={"italic"}
									fontWeight={"bold"}
									as={"a"}
									onClick={onCopy}
									color={hasCopied && "green.500"}
									position={"absolute"}
									top={"1%"}
									right={"8%"}
									zIndex={2}
								>
									{hasCopied ? "Copied!" : "Copy"}
								</Text>
							</Box>
						</VStack>

						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"35px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImCross />}
								aria-label="resetSelect"
								onClick={selectStateReset}
								colorScheme="teal"
								borderRadius={"full"}
								boxSize={12}
								shadow="lg"
							/>
						</Box>
					</Box>
				) : (
					<Box h={"90vh"}>
						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"35px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImPlus />}
								aria-label="addNovel"
								onClick={onAddNovel}
								colorScheme="teal"
								borderRadius={"full"}
								boxSize={12}
								shadow="lg"
							/>
						</Box>
					</Box>
				)
			) : (
				<Box h={"100%"}>Loading...</Box>
			)}
		</>
	);
});

EditorArea.displayName = "EditorArea";
