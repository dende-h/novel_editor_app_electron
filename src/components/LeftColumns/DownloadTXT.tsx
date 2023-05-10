import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	useDisclosure
} from "@chakra-ui/react";
import React, { memo } from "react";
import { ImDownload2 } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const DownloadTXT = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const downloadDraft = useRecoilValue(editorState);

	const downloadLink = () => {
		if (downloadDraft) {
			const blob = new Blob([downloadDraft.body], { type: "text/plain" });

			const link = document.createElement("a");

			link.href = URL.createObjectURL(blob);

			link.download = `${downloadDraft.title}.txt`;

			return link;
		}
	};
	const onClickDownloadButton = () => {
		downloadLink().click();
		onClose();
	};

	return (
		<>
			<Box display={{ base: "none", lg: "block" }}>
				<PrimaryIconButton
					aria-label="downloadText"
					icon={<ImDownload2 />}
					colorScheme={"telegram"}
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
								小説のダウンロード
							</AlertDialogHeader>

							<AlertDialogBody>テキスト形式で小説を保存できます</AlertDialogBody>

							<AlertDialogFooter>
								<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
									キャンセル
								</Button>
								<Button colorScheme="teal" onClick={onClickDownloadButton} ml={3} _focus={{ boxShadow: "none" }}>
									ダウンロード
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Box>
		</>
	);
});
DownloadTXT.displayName = "DownloadTXT";
