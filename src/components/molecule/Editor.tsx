import { Box, Button, Text } from "@chakra-ui/react";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { memo, useEffect, useState, VFC } from "react";

export const EditorArea: VFC = memo(() => {
	const [editorEnable, setEditorEnable] = useState(false);
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	useEffect(() => {
		setEditorEnable(true);
	}, []);

	const saveContent = () => {
		const contentState = editorState.getCurrentContent();
		const raw = convertToRaw(contentState);
		console.log(raw);
	};

	return (
		<>
			{editorEnable && (
				<Box>
					<Text as={"h1"} fontSize="x-large">
						editor
					</Text>
					<Button onClick={saveContent}>save</Button>
					<Box>
						<Editor placeholder="入力してください" editorState={editorState} onChange={setEditorState} />
					</Box>
				</Box>
			)}
		</>
	);
});
