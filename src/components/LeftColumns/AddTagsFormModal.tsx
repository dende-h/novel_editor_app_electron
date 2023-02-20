import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	IconButton,
	Input
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ImPriceTags } from "react-icons/im";
import { useInput } from "../../hooks/useInput";

export const AddTagsFormModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const formInput = useInput();
	const [tags, setTags] = useState<string[]>(["", "", "", "", ""]);
	const onChangeTagInput = (e: ChangeEvent<HTMLInputElement>, inputIndex: number) => {
		formInput.onChangeInputForm(e);
		const newTags = tags.map((item, index) => {
			return inputIndex === index ? formInput.value : item;
		});
		setTags(newTags);
	};
	console.log(tags);
	return (
		<>
			<IconButton
				transitionProperty="all"
				transitionDuration="0.8s"
				transitionTimingFunction={"ease-out"}
				_hover={{ color: "red.600", fontSize: "30px" }}
				_focus={{ color: "red.600", fontSize: "30px" }}
				aria-label="titleInput"
				icon={<ImPriceTags />}
				color={"orange.300"}
				backgroundColor={"gray.300"}
				border={"none"}
				borderRadius={"full"}
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
			/>

			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Tag追加</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{tags.map((item, index) => {
							return (
								<Input
									key={index}
									defaultValue={item}
									value={formInput.value}
									placeholder={"add tags"}
									onChange={(e) => onChangeTagInput(e, index)}
								/>
							);
						})}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
