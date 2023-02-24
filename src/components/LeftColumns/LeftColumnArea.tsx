import { memo, useEffect, useRef, useState } from "react";
import { ImPriceTag, ImQuill } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { VStack, Box, Center, Heading, IconButton, Text, HStack, Icon } from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { isSelected } from "../../globalState/atoms/isSelected";
import { lastEditedTimeSort } from "../../globalState/selector/lastEditedTimeSort";
import { numberOfCharacters } from "../../constant/constant";
import { useDraft } from "../../hooks/useDraft";

export const LeftColumnArea = memo(() => {
	const draft = useRecoilValue(lastEditedTimeSort);
	const [isClient, setIsClient] = useState(false);
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel, onEnterKey, onClickOpenDraft } = useDraft();
	const { veryShortNovel, shortShortNovel } = numberOfCharacters;
	const scrollTopRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	useEffect(() => {
		scrollTopRef?.current?.scrollIntoView();
	}, [isSelect]);

	const cssTranstionPropaty = { transitionProperty: "color , shadow , height , backgroundColor " };

	return (
		<>
			{/* クライアントサイドのみでのレンダリング */}
			{isClient ? (
				<VStack p={6} maxH={"100vh"} overflowY="scroll">
					<Center>
						<VStack ref={scrollTopRef}>
							<IconButton
								aria-label="addNewDraft"
								icon={<ImQuill />}
								color={"brown"}
								backgroundColor={"orange.100"}
								border={"none"}
								_focus={{ backgroundColor: "orange.200", shadow: "2xl" }}
								_hover={{ backgroundColor: "orange.200", shadow: "2xl" }}
								w={"300px"}
								onClick={onAddNovel}
								isDisabled={isSelect}
							/>
							<Text fontWeight={"bold"} fontStyle="italic" color={"gray.500"}>
								{draft.length}:drafts
							</Text>
						</VStack>
					</Center>

					{draft.map((item, index) => {
						//配列をmap関数で回してレンダリングするため、クリックで選択した際の状態をboolean配列で管理
						return (
							<Center key={index}>
								<Box
									opacity={isSelect && !item.isSelected && 0.6}
									sx={
										isSelect
											? item.isSelected
												? undefined
												: {
														_hover: { color: "gray.600", cursor: "not-allowed" }
												  }
											: {
													_hover: { shadow: "lg", color: "gray.600", cursor: "pointer" }
											  }
									}
									shadow={item.isSelected ? "2xl" : "none"}
									h={item.isSelected ? "200px" : "155px"}
									color={item.isSelected ? "gray.800" : "gray.400"}
									marginBottom={item.isSelected ? 8 : 1}
									backgroundColor={item.isSelected ? "gray.300" : "gray.200"}
									// ここから下は固定値、上は受け取った真偽値によって変化
									paddingTop={6}
									w={"290px"}
									marginTop={3}
									borderRadius={5}
									border={"none"}
									css={cssTranstionPropaty}
									transitionDuration="0.8s"
									transitionTimingFunction={"ease-out"}
									fontWeight={"normal"}
									textAlign={"center"}
									tabIndex={0}
									onKeyUp={
										isSelect
											? item.isSelected
												? (e) => onEnterKey(e.key, index)
												: undefined
											: (e) => onEnterKey(e.key, index)
									}
									onClick={
										isSelect
											? item.isSelected
												? () => onClickOpenDraft(index)
												: undefined
											: () => onClickOpenDraft(index)
									}
									position={"relative"}
									_hover={isSelect && !item.isSelected && { cursor: "disable" }}
								>
									<VStack p={2} marginBottom={"100%"}>
										<Heading
											fontSize={"lg"}
											fontWeight="bold"
											textOverflow={"ellipsis"}
											overflow={"hidden"}
											whiteSpace={"nowrap"}
											w={"auto"}
										>
											{item.title}
										</Heading>
										{item.tag.length === 0 ? undefined : (
											<HStack spacing={2} position={"absolute"} textAlign={"left"} top={0} left={2}>
												<Icon as={ImPriceTag} size={"xs"} color={"teal.400"} />
												<Text
													textOverflow={"ellipsis"}
													overflow={"hidden"}
													fontSize={{ base: "xs", xl: "md" }}
													whiteSpace={"nowrap"}
													w={"auto"}
													color={"gray.500"}
												>
													{[...item.tag].toString()}
												</Text>
											</HStack>
										)}
										<Box position={"absolute"} top={0} right={2.5}>
											<Text fontSize={"xs"} color={"gray.500"}>
												{item.maxLength <= veryShortNovel ? "掌編" : item.maxLength <= shortShortNovel ? "SS" : "短編"}
											</Text>
										</Box>
										<IntroductionNovelBody bodyText={item.body} lastEditedTime={item.lastEditedTime} />
										<DraftControllButton isAccordionOpen={item.isSelected} />
									</VStack>
								</Box>
							</Center>
						);
					})}
				</VStack>
			) : undefined}
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
