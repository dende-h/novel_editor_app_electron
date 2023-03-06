/* eslint-disable no-irregular-whitespace */
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import format from "date-fns/format";
import { memo } from "react";

type Props = { bodyText: string; lastEditedTime: Date };

export const IntroductionNovelBody = memo((props: Props) => {
	const { bodyText, lastEditedTime } = props;
	const displayCharacters = 45;
	const displayDate =
		lastEditedTime instanceof Date
			? format(lastEditedTime, "yyyy/MM/dd-HH:mm")
			: format(new Date(lastEditedTime), "yyyy/MM/dd-HH:mm");

	const introductionBody = [...bodyText].filter((char) => {
		return !char.match(/(\s+|　)/g); //空白文字、全角半角スペース、改行は除外
	});

	const css = {
		h: "auto",
		maxW: "220px",
		paddingX: "3",
		textAlign: "left",
		fontSize: "xs",
		fontStyle: "italic",
		_before: { content: `"“"` },
		_after: { content: `"”"` }
	};

	return (
		<Center>
			<VStack>
				<Text sx={css}>
					{bodyText === ""
						? "No content"
						: `${introductionBody
								.filter((_, index) => {
									return index < displayCharacters;
								})
								.join("")}...`}
				</Text>
				<Text sx={css}>{displayDate}</Text>
			</VStack>
		</Center>
	);
});

IntroductionNovelBody.displayName = "IntroductionNovelBody";
