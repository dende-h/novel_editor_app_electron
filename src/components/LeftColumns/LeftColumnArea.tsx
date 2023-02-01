import { Box, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { memo, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImQuill } from "react-icons/im";
import { useRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";

export type draftObjectArray = { title: string; body: string }[];

export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm } = useInput();
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);

	const onClickButton = (value = "無題") => {
		const newDraft = [...draft, { title: value, body: "" }];
		setDraft(newDraft);
	};

	const titleBoxStyle = {};

	return (
		<Box p={6}>
			<HStack>
				<Input
					placeholder="Please input your novel title"
					width={"full"}
					backgroundColor={"gray.100"}
					borderRadius={6}
					border={"none"}
					onChange={onChangeInputForm}
					value={value}
					_focus={{ _focus: "none" }}
				/>
				<IconButton
					aria-label="titleInput"
					icon={<ImQuill />}
					color={"brown"}
					backgroundColor={"gray.100"}
					border={"none"}
					_focus={{ _focus: "none" }}
					borderRadius={"full"}
					onClick={() => onClickButton(value === "" ? undefined : value)}
				/>
			</HStack>
			{draft.map((item, index) => (
				<Box
					_hover={{ backgroundColor: "blue.300", shadow: "dark-lg", color: "black" }}
					key={index}
					h={"auto"}
					w={"auto"}
					backgroundColor={"blue.300"}
					p={"2"}
					marginTop={3}
					borderRadius={5}
					color={"gray"}
					border={"none"}
				>
					{item.title}
				</Box>
			))}
		</Box>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
