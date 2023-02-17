import { Box, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = { bodyText: string };

export const IntroductionNovelBody = memo((props: Props) => {
	const { bodyText } = props;
	const displayCharacters = 45;

	return (
		<Box>
			<Text
				h="auto"
				color="gray.500"
				textAlign={"left"}
				fontSize={"xs"}
				fontStyle={"italic"}
				_before={{ content: `"“"`, color: "gray" }}
				_after={{ content: `"”"`, color: "gray" }}
			>
				{bodyText === undefined || bodyText === ""
					? "No content"
					: `${[...bodyText]
							.filter((_, index) => {
								return index < displayCharacters;
							})
							.join("")}...`}
			</Text>
		</Box>
	);
});

IntroductionNovelBody.displayName = "IntroductionNovelBody";
