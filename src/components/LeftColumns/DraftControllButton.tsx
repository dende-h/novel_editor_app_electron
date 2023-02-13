import { HStack, Button, SlideFade, IconButton } from "@chakra-ui/react";
import { memo, MouseEventHandler } from "react";
import { ImFire, ImLock, ImShare, ImUnlocked } from "react-icons/im";
import { AlertDialogDelete } from "./AlertDialogDelete";

type Props = { isAccordionOpen: boolean; deleteAction: () => void };

export const DraftControllButton = memo((props: Props) => {
	const { isAccordionOpen, deleteAction } = props;

	return (
		<SlideFade in={isAccordionOpen} unmountOnExit={true}>
			<HStack spacing={3} p={2}>
				<AlertDialogDelete deleteAction={deleteAction} />
			</HStack>
		</SlideFade>
	);
});

DraftControllButton.displayName = "DraftControllButton";
