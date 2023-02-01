import { Box, Center, Text, Textarea } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { numberOfCharacters } from "../../constant/constant";
import { drafts } from "../../globalState/atoms/drafts";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useTextArea } from "../../hooks/useTextArea";
import { draftObjectArray } from "../LeftColumns/LeftColumnArea";

export const EditorArea = memo(() => {
	const { value, onChangeTextArea } = useTextArea(); //テキストエリア入力のカスタムフック
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const draftTitle = useRecoilValue<draftObjectArray>(drafts);

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	return (
		<Box p={10}>
			<Center marginY={5}>
				{/* <Text as="b" fontSize={"x-large"}>
					{title}
				</Text> */}
			</Center>
			<Textarea
				placeholder="Here is a sample placeholder"
				width={"800px"}
				height={"800px"}
				backgroundColor={"gray.100"}
				resize={"none"}
				borderRadius={0}
				border={"none"}
				onChange={onChangeTextArea}
				value={value}
				isInvalid={isCharCountOverflow}
			/>
			<Box>
				<Text textColor={isCharCountOverflow ? "red" : "gray.700"}>
					現在の文字数 {charCount} / {numberOfCharacters.veryShortNovel} 文字
				</Text>
			</Box>
		</Box>
	);
});

EditorArea.displayName = "EditorArea";
