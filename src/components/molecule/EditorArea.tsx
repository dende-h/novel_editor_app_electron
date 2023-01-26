import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { useTextArea } from "../../hooks/useTextArea";
import { PrimaryTextArea } from "../atoms/PrimaryTextArea";

export const EditorArea = memo(() => {
	const { value, onChangeTextArea, charCount } = useTextArea();

	return (
		<Box p={10}>
			<PrimaryTextArea
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
