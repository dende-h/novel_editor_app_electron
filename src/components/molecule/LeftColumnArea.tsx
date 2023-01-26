import { Box, HStack } from "@chakra-ui/react";
import { memo } from "react";
import { useInput } from "../../hooks/useInput";
import { PrimaryIconButton } from "../atoms/PrimaryIconButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { ImQuill } from "react-icons/im";


export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm } = useInput();

	return (
		<Box p={6}>
			<HStack>
				<PrimaryInput
					placeholder="Please input your novel title"
					width={"full"}
					backgroundColor={"gray.100"}
					borderRadius={6}
					border={"none"}
					onChange={onChangeInputForm}
					value={value}
					_focus={{ _focus: "none" }}
				/>
				<PrimaryIconButton
					aria-label="titleInput"
					icon={<ImQuill />}
					color={"brown"}
					backgroundColor={"gray.100"}
					border={"none"}
					_focus={{ _focus: "none" }}
					borderRadius={"full"}
				/>
			</HStack>
		</Box>
	);
});

LeftColumnArea.displayName="LeftColumnArea"