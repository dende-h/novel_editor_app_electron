import { Box, IconButton, Input, Text, Textarea, useColorModeValue, VStack } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { ImCross, ImPlus } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { SelectMaxLengthSlider } from "./SelectMaxLengthSlider";

export const EditorArea = memo(() => {
	const { onChangeTitleArea, onBlurFocusTitleInput, onChangeTextArea } = useDraft(); //Draftオブジェクトの操作hooks
	const { focus, onEnterKeyFocusEvent, setConposing } = useEnterKeyEvent();
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [bodyMaxLength, setBodyMaxLength] = useState<number>(0);
	const { onAddNovel, seletStateReset } = useDraft();
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const isClient = useRecoilValue(isClientState);

	useEffect(() => {
		calcCharCount(selectedDraft ? selectedDraft.body : "", selectedDraft ? selectedDraft.maxLength : 0);
		setBodyMaxLength(selectedDraft ? selectedDraft.maxLength : 0);
	}, [selectedDraft]);

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
							<VStack w={"50%"} spacing={0}>
								<Text textColor={isCharCountOverflow && "red"} fontSize={{ base: "sm", md: "md" }}>
									現在の文字数 : {charCount} / {bodyMaxLength} 文字
								</Text>
								<SelectMaxLengthSlider maxLength={bodyMaxLength} />
							</VStack>

							<Textarea
								fontSize={{ base: "xs", md: "sm", lg: "md" }}
								placeholder="Enter the text of your novel here"
								width={"80%"}
								height={"70vh"}
								resize={"none"}
								borderRadius={0}
								border={"none"}
								onChange={onChangeTextArea}
								value={selectedDraft.body}
								isInvalid={isCharCountOverflow}
								ref={focus}
								_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "none" }}
								transitionProperty="all"
								transitionDuration="1.0s"
								transitionTimingFunction={"ease-out"}
								autoFocus={selectedDraft.title !== "" ? true : false}
								padding={5}
							/>
						</VStack>

						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"30px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImCross />}
								aria-label="resetSelect"
								onClick={seletStateReset}
								colorScheme="teal"
								borderRadius={"full"}
							/>
						</Box>
					</Box>
				) : (
					<Box h={"90vh"}>
						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"30px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImPlus />}
								aria-label="addNovel"
								onClick={onAddNovel}
								colorScheme="teal"
								borderRadius={"full"}
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
