import { memo, useEffect, useState } from "react";
import { ImPointUp, ImQuill } from "react-icons/im";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { draftObjectArray, drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { VStack, Box, Center, Heading, IconButton, Text } from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { isSelected } from "../../globalState/atoms/isSelected";
import { draftObject } from "../../globalState/selector/editorState";
import format from "date-fns/format";
import { lastEditedTimeSort } from "../../globalState/selector/lastEditedTimeSort";

export const LeftColumnArea = memo(() => {
	const setDraft = useSetRecoilState<draftObjectArray>(drafts);
	const draft = useRecoilValue(lastEditedTimeSort);
	const [isClient, setIsClient] = useState(false);
	const [isSelect, setIsSelect] = useRecoilState(isSelected);

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const onClickOpenDraft = (selectIndex: number) => {
		if (isSelect === false) {
			setDraft(
				draft.map((item, index) =>
					selectIndex === index
						? { ...item, isSelected: true, lastEditedTime: new Date() }
						: { ...item, isSelected: false }
				)
			);
			setIsSelect(true);
		} else {
			setDraft(
				draft.map((item) => {
					return { ...item, isSelected: false };
				})
			);
			setIsSelect(false);
		}
	};

	const onEnterKey = (key: string, selectIndex: number) => {
		if (key === "Enter") {
			setDraft(
				draft.map((item, index) =>
					selectIndex === index ? { ...item, isSelected: true } : { ...item, isSelected: false }
				)
			);
		}
	};

	const onAddNovel = () => {
		const createTime = new Date();
		setDraft(
			draft.map((item) => {
				return { ...item, isSelected: false };
			})
		);
		setIsSelect(false);
		const newDraft: draftObject = {
			title: "",
			body: "",
			userName: "名無し",
			isSelected: true,
			maxLength: 800,
			isPublished: false,
			tag: [],
			lastEditedTime: createTime
		};
		const oldDraft = [...draft].map((item) => {
			return { ...item, isSelected: false };
		});
		setDraft([newDraft, ...oldDraft]);
		setIsSelect(true);
	};

	const cssTranstionPropaty = { transitionProperty: "color , shadow , height , backgroundColor " };

	return (
		<>
			{/* クライアントサイドのみでのレンダリング */}
			{isClient ? (
				<VStack p={6}>
					<Center>
						<VStack>
							<IconButton
								aria-label="addNewDraft"
								icon={<ImQuill />}
								color={"brown"}
								backgroundColor={"orange.100"}
								border={"none"}
								_focus={{ backgroundColor: "orange.200", shadow: "2xl" }}
								_hover={{ backgroundColor: "orange.200", shadow: "2xl" }}
								w={"250px"}
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
									visibility={isSelect ? (item.isSelected ? "visible" : "hidden") : "visible"}
									sx={
										item.isSelected
											? undefined
											: {
													_hover: { shadow: "lg", color: "gray.600", cursor: "pointer" }
											  }
									}
									shadow={item.isSelected ? "2xl" : "none"}
									h={item.isSelected ? "163px" : "100px"}
									color={item.isSelected ? "gray.800" : "gray.400"}
									marginBottom={item.isSelected ? 8 : 1}
									backgroundColor={item.isSelected ? "gray.300" : "gray.200"}
									// ここから下は固定値、上は受け取った真偽値によって変化
									paddingTop={2}
									w={"250px"}
									marginTop={3}
									borderRadius={5}
									border={"none"}
									css={cssTranstionPropaty}
									transitionDuration="0.8s"
									transitionTimingFunction={"ease-out"}
									fontWeight={"normal"}
									textAlign={"center"}
									tabIndex={0}
									onKeyUp={(e) => onEnterKey(e.key, index)}
									onClick={() => onClickOpenDraft(index)}
								>
									<VStack p={2} marginBottom={"100%"}>
										<Heading
											fontSize={"lg"}
											fontWeight="bold"
											textOverflow={"ellipsis"}
											overflow={"hidden"}
											whiteSpace={"nowrap"}
											w={"200px"}
										>
											{item.title}
										</Heading>
										<IntroductionNovelBody bodyText={item.body} lastEditedTime={item.lastEditedTime} />
										<DraftControllButton isAccordionOpen={item.isSelected} />
									</VStack>
								</Box>
							</Center>
						);
					})}

					<IconButton
						size={"lg"}
						position={"fixed"}
						bottom={"30px"}
						left={"30px"}
						shadow={"lg"}
						transitionProperty="all"
						transitionDuration="0.8s"
						transitionTimingFunction={"ease-out"}
						aria-label="scrollTop"
						_focus={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
						_hover={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
						icon={<ImPointUp />}
						color={"brown"}
						backgroundColor={"orange.100"}
						opacity={"0.6"}
						border={"none"}
						borderRadius={"full"}
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
					/>
				</VStack>
			) : undefined}
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
