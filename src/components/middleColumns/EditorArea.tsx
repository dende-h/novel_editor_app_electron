import { Box, Center, HStack, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { ImCross, ImPlus } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { SelectMaxLengthSlider } from "./SelectMaxLengthSlider";

export const EditorArea = memo(() => {
	const { onChangeTitleArea, onBlurFocusTitleInput, onChangeTextArea } = useDraft(); //Draftオブジェクトの操作hooks
	const { focus, onEnterKeyFocusEvent, setConposing } = useEnterKeyEvent();
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const [isClient, setIsClient] = useState(false);
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [bodyMaxLength, setBodyMaxLength] = useState<number>(0);
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel, seletStateReset } = useDraft();

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	useEffect(() => {
		calcCharCount(selectedDraft ? selectedDraft.body : "", selectedDraft ? selectedDraft.maxLength : 0);
		setBodyMaxLength(selectedDraft ? selectedDraft.maxLength : 0);
	}, [selectedDraft]);

	return (
		<>
			{isClient ? (
				selectedDraft ? (
					<Box p={{ base: 2, md: 3, lg: 4, xl: 6 }} minW={"350px"} minH={"100vh"} position={"relative"} zIndex={1}>
						<Center>
							<VStack spacing={{ base: 4, md: 5, lg: 5, xl: 5 }}>
								<VStack>
									<Text
										textColor={"gray.500"}
										fontSize={{ base: "sm", md: "md" }}
									>{`タイトル : ${selectedDraft.title.length} / 30文字`}</Text>
									<Input
										color={"gray.500"}
										fontSize={{ base: "md", md: "lg" }}
										value={selectedDraft.title}
										onChange={onChangeTitleArea}
										border={"none"}
										borderRadius={0}
										backgroundColor={"gray.200"}
										width={"300px"}
										onCompositionStart={() => setConposing(true)}
										onCompositionEnd={() => {
											setConposing(false);
										}}
										onKeyUp={onEnterKeyFocusEvent} //KeyDownだとテキストエリアに改行が入ってしまうのでUp
										placeholder="novel title"
										textAlign={"center"}
										maxLength={30}
										_focus={{ color: "gray.600", backgroundColor: "gray.100", boxShadow: "outline" }}
										transitionProperty="all"
										transitionDuration="1.0s"
										transitionTimingFunction={"ease-out"}
										onBlur={onBlurFocusTitleInput}
										autoFocus={selectedDraft.title === "" ? true : false}
									/>
								</VStack>
								<VStack w={{ base: "340px", md: "740px" }} spacing={0}>
									<Text textColor={isCharCountOverflow ? "red" : "gray.500"} fontSize={{ base: "sm", md: "md" }}>
										現在の文字数 : {charCount} / {bodyMaxLength} 文字
									</Text>
									<SelectMaxLengthSlider maxLength={bodyMaxLength} />
								</VStack>

								<Textarea
									fontSize={{ base: "xs", md: "sm", lg: "md" }}
									placeholder="Enter the text of your novel here"
									width={{ base: "320px", md: "680px", lg: "630px", xl: "900px", xxl: "1200px" }}
									minH={"70vh"}
									backgroundColor={"gray.200"}
									resize={"none"}
									borderRadius={0}
									border={"none"}
									onChange={onChangeTextArea}
									value={selectedDraft.body}
									isInvalid={isCharCountOverflow}
									ref={focus}
									_focus={{ color: "gray.600", backgroundColor: "gray.100", boxShadow: "none" }}
									transitionProperty="all"
									transitionDuration="1.0s"
									transitionTimingFunction={"ease-out"}
									autoFocus={selectedDraft.title !== "" ? true : false}
								/>
							</VStack>
						</Center>
						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"30px"} right={"30px"} zIndex={2}>
							{isSelect ? (
								<IconButton
									icon={<ImCross />}
									aria-label="openDrawer"
									onClick={seletStateReset}
									colorScheme="teal"
									borderRadius={"full"}
								/>
							) : (
								<IconButton
									icon={<ImPlus />}
									aria-label="openDrawer"
									onClick={onAddNovel}
									colorScheme="teal"
									borderRadius={"full"}
								/>
							)}
						</Box>
					</Box>
				) : (
					<Box h={"100vh"}></Box>
				)
			) : (
				<Box h={"100vh"}></Box>
			)}
		</>
	);
});

EditorArea.displayName = "EditorArea";
