import { memo, useEffect, useRef } from "react";
import { ImPointUp, ImPriceTag } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import {
	VStack,
	Box,
	Center,
	Heading,
	IconButton,
	Text,
	HStack,
	Icon,
	Button,
	useColorModeValue
} from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { isSelected } from "../../globalState/atoms/isSelected";
import { lastEditedTimeSort } from "../../globalState/selector/lastEditedTimeSort";
import { numberOfCharacters } from "../../constant/constant";
import { useDraft } from "../../hooks/useDraft";
import { isEdited } from "../../globalState/atoms/isEdited";
import { isClientState } from "../../globalState/atoms/isClientState";

export const LeftColumnArea = memo(() => {
	const draft = useRecoilValue(lastEditedTimeSort);
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel, onEnterKey, onClickOpenDraft } = useDraft();
	const { veryShortNovel, shortShortNovel } = numberOfCharacters;
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const isEdit = useRecoilValue(isEdited);
	const fontColorIsNotSelectedDraft = useColorModeValue("gray.400", "gray.100");
	const bgColorIsSelectedDraftCard = useColorModeValue("gray.300", "gray.500");
	const bgColorIsNotSelectedDraftCard = useColorModeValue("gray.200", "gray.600");
	const isClient = useRecoilValue(isClientState);

	useEffect(() => {
		scrollTopRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [isEdit]);

	const cssTranstionPropaty = { transitionProperty: "color , shadow , height , backgroundColor " };

	return (
		<>
			{/* クライアントサイドのみでのレンダリング */}
			{isClient ? (
				<VStack
					p={6}
					maxH={{ base: "100%", lg: "100%" }}
					overflowY="scroll"
					position={"relative"}
					zIndex={1}
					h={"100%"}
				>
					<IconButton
						boxSize={12}
						position={"fixed"}
						bottom={"30px"}
						left={{ base: "10px", lg: "75px" }}
						shadow={"lg"}
						transitionProperty="all"
						transitionDuration="0.8s"
						transitionTimingFunction={"ease-out"}
						aria-label="scrollTop"
						_focus={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
						_hover={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
						icon={<ImPointUp />}
						colorScheme={"orange"}
						opacity={0.6}
						border={"none"}
						borderRadius={"full"}
						onClick={() => {
							scrollTopRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
						}}
						zIndex={2}
					/>
					<Center>
						<VStack ref={scrollTopRef}>
							<Button
								colorScheme={"teal"}
								border={"none"}
								_focus={{ opacity: 0.8, shadow: "2xl" }}
								_hover={{ opacity: 0.8, shadow: "2xl" }}
								w={{ base: "270px", xl: "290px" }}
								onClick={onAddNovel}
								isDisabled={isSelect}
							>
								Add Novel
							</Button>
							<Text fontWeight={"bold"} fontStyle="italic">
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
														_hover: { cursor: "not-allowed" }
												  }
											: {
													_hover: { shadow: "lg", cursor: "pointer" }
											  }
									}
									shadow={item.isSelected ? "2xl" : "none"}
									h={item.isSelected ? "200px" : "155px"}
									color={!item.isSelected && fontColorIsNotSelectedDraft}
									marginBottom={item.isSelected ? 8 : 1}
									backgroundColor={item.isSelected ? bgColorIsSelectedDraftCard : bgColorIsNotSelectedDraftCard}
									// ここから下は固定値、上は受け取った真偽値によって変化
									paddingTop={6}
									w={{ base: "270px", xl: "290px" }}
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
												<Icon as={ImPriceTag} boxSize={4} color={"teal.400"} />
												<Text
													textOverflow={"ellipsis"}
													overflow={"hidden"}
													fontSize={{ base: "xs", xl: "md" }}
													whiteSpace={"nowrap"}
													w={"auto"}
												>
													{[...item.tag].toString()}
												</Text>
											</HStack>
										)}
										<Box position={"absolute"} top={0} right={2.5}>
											<Text fontSize={"xs"}>
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
