import { memo, useEffect, useState } from "react";
import { ImPointUp, ImQuill } from "react-icons/im";
import { useRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { VStack, Box, Center, Heading, HStack, IconButton } from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { useDraft } from "../../hooks/useDraft";
import { isSelected } from "../../globalState/atoms/isSelected";

export type draftObjectArray = {
	title: string;
	body: string;
	userName?: string;
	isSelected: boolean;
	maxLength: number;
}[];

export const LeftColumnArea = memo(() => {
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const [isClient, setIsClient] = useState(false);
	const { deleteAction } = useDraft();
	const [isSelect, setIsSelect] = useRecoilState(isSelected);
	const [addNovel, setAddNovel] = useState(false);

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	useEffect(() => {
		if (addNovel) {
			onAddNovel();
		}
		setAddNovel(false);
	}, [addNovel]);

	const onClickAddDraft = (selectIndex: number) => {
		if (isSelect === false) {
			setDraft(
				draft.map((item, index) =>
					selectIndex === index ? { ...item, isSelected: true } : { ...item, isSelected: false }
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

	const onAddNovelInit = () => {
		setDraft(
			draft.map((item) => {
				return { ...item, isSelected: false };
			})
		);
		setIsSelect(false);
		setAddNovel(true);
	};

	const onAddNovel = () => {
		const newDraft: draftObjectArray = [
			{
				title: "",
				body: "",
				userName: "名無し",
				isSelected: true,
				maxLength: 800
			},
			...draft
		];
		setDraft(newDraft);
		setIsSelect(true);
		setAddNovel(true);
	};

	const cssTranstionPropaty = { "transition-property": "color , shadow , height , background-color " };

	return (
		<>
			<VStack p={6}>
				<Center>
					<HStack>
						<IconButton
							aria-label="addNewDraft"
							icon={<ImQuill />}
							color={"brown"}
							backgroundColor={"orange.100"}
							border={"none"}
							_focus={{ backgroundColor: "orange.200", shadow: "2xl", cursor: "pointer" }}
							_hover={{ backgroundColor: "orange.200", shadow: "2xl", cursor: "pointer" }}
							w={"250px"}
							onClick={onAddNovelInit}
						/>
					</HStack>
				</Center>
				{/* クライアントサイドのみでのレンダリング */}
				{isClient
					? draft.map((item, index) => {
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
										h={item.isSelected ? (item.body === "" ? "128px" : "163px") : "100px"}
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
										onClick={() => onClickAddDraft(index)}
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
											<IntroductionNovelBody bodyText={item.body} />
											<DraftControllButton isAccordionOpen={item.isSelected} deleteAction={deleteAction} />
										</VStack>
									</Box>
								</Center>
							);
					  })
					: undefined}
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
					_focus={{ backgroundColor: "orange.200", shadow: "2xl", cursor: "pointer" }}
					_hover={{ backgroundColor: "orange.200", shadow: "2xl", cursor: "pointer" }}
					icon={<ImPointUp />}
					color={"brown"}
					backgroundColor={"orange.100"}
					border={"none"}
					borderRadius={"full"}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
			</VStack>
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
