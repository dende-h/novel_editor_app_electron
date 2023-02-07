import { HStack, Button, SlideFade } from "@chakra-ui/react";
import { memo } from "react";

type Props = { isOpen: boolean };

export const DraftControllButton = memo((props: Props) => {
	const { isOpen } = props;

	return (
		<SlideFade in={isOpen} unmountOnExit={true}>
			<HStack spacing={2} p={1}>
				<Button>1</Button>
				<Button>2</Button>
				<Button>3</Button>
			</HStack>
		</SlideFade>
	);
});

DraftControllButton.displayName = "DraftControllButton";
