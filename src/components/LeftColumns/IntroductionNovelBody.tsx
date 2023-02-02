import { Box, SlideFade, Text } from "@chakra-ui/react";
import { memo, useState } from "react";

type Props = { bodyText: string; isOpen: boolean };

export const IntroductionNovelBody = memo((props: Props) => {
	const { bodyText, isOpen } = props;
	const displayCharacters: number = 45;

	return (
		<SlideFade in={isOpen}>
			<Text
				h="50px"
				color="gray.500"
				textAlign={"left"}
				fontSize={"xs"}
				fontStyle={"italic"}
				_before={{ content: `"“"`, color: "gray" }}
				_after={{ content: `"”"`, color: "gray" }}
			>
				{bodyText === ""
					? "No content"
					: `${[...bodyText]
							.filter((_, index) => {
								return index < displayCharacters;
							})
							.join("")}...`}
			</Text>
		</SlideFade>
	);
});
