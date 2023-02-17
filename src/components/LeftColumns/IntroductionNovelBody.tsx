import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";

type Props = { bodyText: string; lastEditedTime: string };

export const IntroductionNovelBody = memo((props: Props) => {
	const { bodyText, lastEditedTime } = props;
	const displayCharacters = 45;

	const css = {
		h: "auto",
		color: "gray.500",
		textAlign: "left",
		fontSize: "xs",
		fontStyle: "italic",
		_before: { content: `"“"`, color: "gray" },
		_after: { content: `"”"`, color: "gray" }
	};

	return (
		<Center>
			<VStack>
				<Text sx={css}>
					{bodyText === undefined || bodyText === ""
						? "No content"
						: `${[...bodyText]
								.filter((_, index) => {
									return index < displayCharacters;
								})
								.join("")}...`}
				</Text>
				<Text sx={css}>{lastEditedTime}</Text>
			</VStack>
		</Center>
	);
});

IntroductionNovelBody.displayName = "IntroductionNovelBody";
