import { Box, Textarea } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useTextArea } from "../../hooks/useTextArea";

export const EditorArea = memo(() => {
	const { value, onChangeTextArea } = useTextArea(); //テキストエリア入力のカスタムフック
	const { charCount, calcCharCount } = useCalcCharCount(); //文字数計算のロジック部

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	return (
		<Box p={10}>
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
			/>
			<Box>現在の文字数：{charCount}</Box>
		</Box>
	);
});

EditorArea.displayName = "EditorArea";
