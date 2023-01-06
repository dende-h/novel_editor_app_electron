import { Box, Text } from "@chakra-ui/react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { memo, useEffect, useState, VFC } from "react";

export const EditorArea: VFC = memo(() => {
	const [editorEnable, setEditorEnable] = useState(false);
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	useEffect(() => {
		setEditorEnable(true);
	}, []);

	return (
		<>
			{editorEnable && (
				<Box>
					<Text as={"h1"} fontSize="x-large">
						editor
					</Text>
					<Box>
						<Editor placeholder="入力してください" editorState={editorState} onChange={setEditorState} />
					</Box>
				</Box>
			)}
		</>
	);
});
