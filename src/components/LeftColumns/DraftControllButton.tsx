import { HStack, SlideFade } from "@chakra-ui/react";
import { memo } from "react";
import { AlertDialogDelete } from "./AlertDialogDelete";

type Props = { isAccordionOpen: boolean };

export const DraftControllButton = memo((props: Props) => {
	const { isAccordionOpen } = props;

	return (
		<SlideFade in={isAccordionOpen} unmountOnExit={true}>
			<HStack spacing={3} p={2}>
				<AlertDialogDelete />
			</HStack>
		</SlideFade>
	);
});

DraftControllButton.displayName = "DraftControllButton";
