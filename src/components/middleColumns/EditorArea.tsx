import { Box, Center, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { numberOfCharacters } from "../../constant/constant";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useNovelBodyEdit } from "../../hooks/useNovelBodyEdit";
import { useNovelTitleEdit } from "../../hooks/useNovelTitleEdit";
import { SelectMaxLengthSlider } from "./SelectMaxLengthSlider";

export const EditorArea = memo(() => {
	const { onChangeTitleArea, setConposing, onEnterKeyDown, isFocus, setIsFocus, onBlurFocus } = useNovelTitleEdit(); //フォーカス移動
	const { onChangeTextArea } = useNovelBodyEdit(); //本文エリア入力のカスタムフック
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const [isClient, setIsClient] = useState(false);
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [bodyMaxLength, setBodyMaxLength] = useState<number>(0);
	const bodyFocus = useRef<HTMLTextAreaElement>(null);

	const focusEvent = () => {
		bodyFocus.current.focus();
		setIsFocus(false);
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	useEffect(() => {
		calcCharCount(selectedDraft ? selectedDraft.body : "", selectedDraft ? selectedDraft.maxLength : 0);
		setBodyMaxLength(selectedDraft ? selectedDraft.maxLength : 0);
	}, [selectedDraft]);

	useEffect(() => {
		if (isFocus) {
			focusEvent();
		}
	}, [isFocus]);

	return (
		<>
			{isClient ? (
				selectedDraft ? (
					<Box p={10}>
						<Center>
							<VStack spacing={5}>
								<VStack marginY={5}>
									<Text textColor={"gray.500"}>{`タイトル : ${selectedDraft.title.length} / 30文字`}</Text>
									<Input
										color={"gray.500"}
										fontSize={"lg"}
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
										onKeyDown={onEnterKeyDown}
										onBlur={onBlurFocus}
										placeholder="novel title"
										textAlign={"center"}
										maxLength={30}
										_focus={{ color: "gray.600", backgroundColor: "gray.100", boxShadow: "none" }}
										transitionProperty="all"
										transitionDuration="1.0s"
										transitionTimingFunction={"ease-out"}
									/>
								</VStack>
								<HStack w={"900px"}>
									<Text w={"25%"} textColor={isCharCountOverflow ? "red" : "gray.500"}>
										現在の文字数 : {charCount} / {bodyMaxLength} 文字
									</Text>
									<SelectMaxLengthSlider maxLength={bodyMaxLength} />
								</HStack>

								<Textarea
									placeholder="Enter the text of your novel here"
									width={"800px"}
									height={"800px"}
									backgroundColor={"gray.200"}
									resize={"none"}
									borderRadius={0}
									border={"none"}
									onChange={onChangeTextArea}
									value={selectedDraft.body}
									isInvalid={isCharCountOverflow}
									ref={bodyFocus}
									autoFocus={true}
									_focus={{ color: "gray.600", backgroundColor: "gray.100", boxShadow: "none" }}
									transitionProperty="all"
									transitionDuration="1.0s"
									transitionTimingFunction={"ease-out"}
								/>
							</VStack>
						</Center>
					</Box>
				) : (
					<Box h={"980px"} w={"880"}></Box>
				)
			) : undefined}
		</>
	);
});

EditorArea.displayName = "EditorArea";
