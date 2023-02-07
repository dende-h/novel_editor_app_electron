import { memo, useEffect, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImQuill } from "react-icons/im";
import { useRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { useToggle } from "../../hooks/useToggle";
import { VStack, Box, Center, Heading, HStack, IconButton, Input } from "@chakra-ui/react";
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
										paddingTop={2}
										shadow={booleanArray[index] ? "2xl" : "none"}
										h={booleanArray[index] ? (item.body === "" ? "128px" : "163px") : "100px"}
										w={"250px"}
										backgroundColor={"red.200"}
										marginTop={3}
										borderRadius={5}
										color={booleanArray[index] ? "gray.700" : "gray.400"}
										border={"none"}
										transitionProperty="all"
										transitionDuration="0.8s"
										transitionTimingFunction={"ease-out"}
										fontWeight={"normal"}
										textAlign={"center"}
										marginBottom={booleanArray[index] ? 8 : 1}
										as={"button"}
										onClick={booleanArray[index] ? () => toggleOff() : () => toggleOn(index)}
										sx={booleanArray[index] ? undefined : { _hover: { shadow: "lg", color: "gray.500" } }}
									>
										<VStack p={2} marginBottom={"100%"}>
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
