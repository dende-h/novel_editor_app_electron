import { memo, useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImPointUp, ImQuill } from "react-icons/im";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { useToggle } from "../../hooks/useToggle";
import { VStack, Box, Center, Heading, HStack, IconButton, Input, Button } from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { useDeleteDraft } from "../../hooks/useDeleteDraft";
import { useFocusEvent } from "../../hooks/useFocusEvent";
import { selectedState } from "../../globalState/selector/selectedState";
import { resolve } from "path";

export type draftObjectArray = {
	title: string;
	body: string;
	userName?: string;
	isSelected: boolean;
	maxLength: number;
}[];

export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm, setValue } = useInput();
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const [isClient, setIsClient] = useState(false);
	const { setSelectedReset, deleteAction } = useDeleteDraft();
	const { setConposing, setIsFocus } = useFocusEvent(); //フォーカスイベント
	const [isSelect, setIsSelect] = useState(false);
	const inputFocus = useRef<HTMLInputElement>(null);

	const focusEvent = () => {
		inputFocus.current.focus();
		setIsFocus(false);
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
		setSelectedReset(true);
	}, []);

	const onClickNewDraft = () => {
		onInputFocus();
		onInputTitle();
	};

	const onClickDraft = (selectIndex: number) => {
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

	const onInputFocus = () => {
		setDraft(
			draft.map((item) => {
				return { ...item, isSelected: false };
			})
		);
		setIsSelect(false);
	};

	const onInputTitle = () => {
		console.log("title");
		const newDraft: draftObjectArray = [
			{
				title: "無題",
				body: undefined,
				userName: "名無し",
				isSelected: true,
				maxLength: 800
			},
			...draft
		];
		setDraft(newDraft);
		setValue("");
		setIsSelect(true);
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
							w={"full"}
							onClick={onClickNewDraft}
						/>
						<Input
							placeholder="Please input novel title"
							width={"full"}
							backgroundColor={"gray.100"}
							borderRadius={6}
							border={"none"}
							onChange={onChangeInputForm}
							value={value}
							onCompositionStart={() => setConposing(true)}
							onCompositionEnd={() => {
								setConposing(false);
							}}
							// onKeyDown={(e) => e.key === "Enter" && onInputTitle(value === "" ? undefined : value)}
							onFocus={onInputFocus}
							ref={inputFocus}
							autoFocus
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
										onKeyDown={(e) => onEnterKey(e.key, index)}
										onClick={() => onClickDraft(index)}
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
						focusEvent();
					}}
				/>
			</VStack>
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
