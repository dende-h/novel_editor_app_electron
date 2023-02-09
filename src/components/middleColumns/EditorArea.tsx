import { Box, Center, Input, Text, Textarea } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { numberOfCharacters } from "../../constant/constant";
import { selectedFlugArray } from "../../globalState/atoms/selectedFlugArray";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useNovelBodyEdit } from "../../hooks/useNovelBodyEdit";
import { useNovelTitleEdit } from "../../hooks/useNovelTitleEdit";

export const EditorArea = memo(() => {
	const { onChangeTitleArea, setConposing, onEnterKeyDown, isFocus, setIsFocus } = useNovelTitleEdit(); //タイトル入力のカスタムフック
	const { onChangeTextArea } = useNovelBodyEdit(); //本文エリア入力のカスタムフック
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const bodyFocus = useRef(null);
	const focusEvent = () => {
		bodyFocus.current.focus();
		setIsFocus(false);
	};

	useEffect(() => {
		calcCharCount(selectedDraft ? selectedDraft.body : "");
	}, [selectedDraft]);

	useEffect(() => {
		if (isFocus) {
			focusEvent();
		}
	}, [isFocus]);

	return (
		<>
			{selectedDraft ? (
				<Box p={10}>
					<Center marginY={5}>
						<Input
							fontSize={"lg"}
							value={selectedDraft.title}
							onChange={onChangeTitleArea}
							border={"none"}
							borderRadius={0}
							backgroundColor={"gray.100"}
							width={"300px"}
							onCompositionStart={() => setConposing(true)}
							onCompositionEnd={() => {
								setConposing(false);
							}}
							onKeyDown={onEnterKeyDown}
						/>
					</Center>
					<Center>
						<Textarea
							placeholder="Here is a sample placeholder"
							width={"800px"}
							height={"800px"}
							backgroundColor={"gray.100"}
							resize={"none"}
							borderRadius={0}
							border={"none"}
							onChange={onChangeTextArea}
							value={selectedDraft.body}
							isInvalid={isCharCountOverflow}
							ref={bodyFocus}
						/>
					</Center>
					<Box>
						<Text textColor={isCharCountOverflow ? "red" : "gray.700"}>
							現在の文字数 {charCount} / {numberOfCharacters.veryShortNovel} 文字
						</Text>
					</Box>
				</Box>
			) : (
				<Box h={"980px"} w={"880"}></Box>
			)}
		</>
	);
});

EditorArea.displayName = "EditorArea";
