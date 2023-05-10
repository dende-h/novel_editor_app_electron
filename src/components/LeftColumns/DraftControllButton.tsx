import { HStack, SlideFade } from "@chakra-ui/react";
import { memo } from "react";
import { AddTagsFormModal } from "./AddTagsFormModal";
import { AlertDialogDelete } from "./AlertDialogDelete";
import { DownloadTXT } from "./DownloadTXT";
import { PublishedChange } from "./PublishedChange";
import { UploadImageModal } from "./UploadImageModal";

type Props = { isAccordionOpen: boolean };

export const DraftControllButton = memo((props: Props) => {
	const { isAccordionOpen } = props;

	return (
		<SlideFade in={isAccordionOpen} unmountOnExit={true}>
			<HStack spacing={3} p={2}>
				<AddTagsFormModal />
				<DownloadTXT />
				<AlertDialogDelete />
				<PublishedChange />
				<UploadImageModal />
			</HStack>
		</SlideFade>
	);
});

DraftControllButton.displayName = "DraftControllButton";
