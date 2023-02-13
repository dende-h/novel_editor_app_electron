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
import { type } from "os";
import React from "react";
import { ImFire } from "react-icons/im";
import { useDeleteDraft } from "../../hooks/useDeleteDraft";

type Props = { deleteAction: () => void };

export const AlertDialogDelete = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const { deleteAction } = props;
	const onClickDeleteButton = () => {
		deleteAction();
		onClose();
	};

	return (
		<>
			<IconButton
				aria-label="titleInput"
				icon={<ImFire />}
				color={"orange.500"}
				backgroundColor={"red.200"}
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
