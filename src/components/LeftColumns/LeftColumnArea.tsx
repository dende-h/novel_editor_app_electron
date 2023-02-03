import { Box, Center, Grid, Heading, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImQuill } from "react-icons/im";
import { useRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { useToggle } from "../../hooks/useToggle";

export type draftObjectArray = { title: string; body: string }[];

export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm } = useInput();
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const indexArray = draft.map((_, index) => index);
	const { toggleOn, booleanArray, toggleOff } = useToggle(indexArray);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const onClickButton = (value = "無題") => {
		const newDraft = [
			...draft,
			{
				title: value,
				body: ""
			}
		];
		setDraft(newDraft);
	};

	return (
		<>
			<Grid p={6}>
				<Center>
					<HStack>
						<Input
							placeholder="Please input your novel title"
							width={"full"}
							backgroundColor={"gray.100"}
							borderRadius={6}
							border={"none"}
							onChange={onChangeInputForm}
							value={value}
							_focus={{ _focus: "none" }}
						/>
						<IconButton
							aria-label="titleInput"
							icon={<ImQuill />}
							color={"brown"}
							backgroundColor={"gray.100"}
							border={"none"}
							_focus={{ _focus: "none" }}
							borderRadius={"full"}
							onClick={() => onClickButton(value === "" ? undefined : value)}
						/>
					</HStack>
				</Center>

				{isClient
					? draft.map((item, index) => {
							return (
								<Center key={index}>
									<Box
										_hover={{ shadow: "lg", color: "gray.700", h: "100px" }}
										h={"50px"}
										w={250}
										backgroundColor={"red.200"}
										marginTop={3}
										borderRadius={5}
										color={"gray.400"}
										border={"none"}
										transitionProperty="all"
										transitionDuration="0.5s"
										transitionTimingFunction={"ease-out"}
										fontWeight={"normal"}
										textAlign={"center"}
										onMouseOver={() => toggleOn(index)}
										onMouseLeave={() => toggleOff()}
									>
										<VStack padding={2}>
											<Heading fontSize={"lg"} fontWeight="bold" textOverflow={"ellipsis"}>
												{item.title}
											</Heading>
											<IntroductionNovelBody bodyText={item.body} isOpen={booleanArray[index]} />
										</VStack>
									</Box>
								</Center>
							);
					  })
					: undefined}
			</Grid>
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
