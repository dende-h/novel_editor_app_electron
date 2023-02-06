import { memo, useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImQuill } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { useToggle } from "../../hooks/useToggle";
import {
	VStack,
	Box,
	Center,
	Heading,
	HStack,
	IconButton,
	Input,
	AccordionPanel,
	AccordionIcon,
	AccordionButton,
	Accordion,
	AccordionItem
} from "@chakra-ui/react";
import { draftArrayIndex } from "../../globalState/selector/draftArrayIndex";
import { DraftControllButton } from "./DraftControllButton";

export type draftObjectArray = { title: string; body: string }[];

export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm, setValue } = useInput();
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const { toggleOn, booleanArray, toggleOff } = useToggle();
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
		setValue("");
		console.log(draft.length);
		console.log(booleanArray.length);
	};

	return (
		<>
			<VStack p={6}>
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
										shadow={booleanArray[index] ? "2xl" : "none"}
										h={booleanArray[index] ? 170 : 110}
										w={250}
										backgroundColor={"red.200"}
										marginTop={3}
										borderRadius={5}
										color={booleanArray[index] ? "gray.700" : "gray.400"}
										border={"none"}
										transitionProperty="all"
										transitionDuration="0.5s"
										transitionTimingFunction={"ease-out"}
										fontWeight={"normal"}
										textAlign={"center"}
										as={"button"}
										onClick={() => toggleOn(index)}
										marginBottom={booleanArray[index] ? 8 : 1}
									>
										<VStack padding={2}>
											<Heading fontSize={"lg"} fontWeight="bold" textOverflow={"ellipsis"}>
												{item.title}
											</Heading>
											<IntroductionNovelBody bodyText={item.body} />
											<DraftControllButton isOpen={booleanArray[index]} />
										</VStack>
									</Box>
								</Center>
							);
					  })
					: undefined}
			</VStack>
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
