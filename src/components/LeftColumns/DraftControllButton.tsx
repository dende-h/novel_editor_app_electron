import { SlideFade, HStack, Button } from "@chakra-ui/react";
import { memo } from "react";

type Props = { isOpen: boolean };

export const DraftControllButton = memo((props: Props) => {
	const { isOpen } = props;

	return (
		<SlideFade in={isOpen}>
			<HStack spacing={2}>
				<Button hidden={isOpen ? false : true}>1</Button>
				<Button hidden={isOpen ? false : true}>2</Button>
				<Button hidden={isOpen ? false : true}>3</Button>
			</HStack>
		</SlideFade>
	);
});

DraftControllButton.displayName = "DraftControllButton";
