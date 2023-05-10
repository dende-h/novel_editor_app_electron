import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure
} from "@chakra-ui/react";
import React, { memo } from "react";
import { ImFire } from "react-icons/im";
import { useDraft } from "../../hooks/useDraft";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const AlertDialogDelete = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const { deleteAction } = useDraft();
	const onClickDeleteButton = () => {
		deleteAction();
		onClose();
	};

	return (
		<>
			<PrimaryIconButton
				aria-label="deleteDraft"
				icon={<ImFire />}
				colorScheme={"orange"}
				focusOutline={"none"}
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
});
AlertDialogDelete.displayName = "AlertDialogDelete";
