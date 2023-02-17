import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	IconButton,
	useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { ImFire } from "react-icons/im";
import { useDraft } from "../../hooks/useDraft";

export const AlertDialogDelete = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const { deleteAction } = useDraft();
	const onClickDeleteButton = () => {
		deleteAction();
		onClose();
	};

	return (
		<>
			<IconButton
				transitionProperty="all"
				transitionDuration="0.8s"
				transitionTimingFunction={"ease-out"}
				_hover={{ color: "red.600", fontSize: "30px" }}
				_focus={{ color: "red.600", fontSize: "30px" }}
				aria-label="titleInput"
				icon={<ImFire />}
				color={"orange.300"}
				backgroundColor={"gray.300"}
				border={"none"}
				borderRadius={"full"}
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
			/>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							小説の焼却炉
						</AlertDialogHeader>

						<AlertDialogBody>本当に焼却しますか？後から取り消すことはできません。</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								キャンセル
							</Button>
							<Button colorScheme="red" onClick={onClickDeleteButton} ml={3} _focus={{ boxShadow: "none" }}>
								焼却する
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
