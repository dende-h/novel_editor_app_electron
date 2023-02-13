import { memo, useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import { ImQuill } from "react-icons/im";
import { useRecoilState, useSetRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import { useToggle } from "../../hooks/useToggle";
import { VStack, Box, Center, Heading, HStack, IconButton, Input } from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { selectedFlugArray } from "../../globalState/atoms/selectedFlugArray";
import { isSelectedReset } from "../../globalState/atoms/isSelectedReset";
import { useDeleteDraft } from "../../hooks/useDeleteDraft";
import { useNovelTitleEdit } from "../../hooks/useNovelTitleEdit";
import { useFocusEvent } from "../../hooks/useFocusEvent";

export type draftObjectArray = { title: string; body: string; userName?: string }[];

export const LeftColumnArea = memo(() => {
	const { value, onChangeInputForm, setValue } = useInput();
	const [draft, setDraft] = useRecoilState<draftObjectArray>(drafts);
	const selectFlug = useToggle();
	const [isClient, setIsClient] = useState(false);
	const setIsSelectArray = useSetRecoilState<boolean[]>(selectedFlugArray);
	const { isSelectedReset, setSelectedReset, deleteAction } = useDeleteDraft();
	const { setConposing, onEnterKeyDown, isFocus, setIsFocus } = useFocusEvent(); //フォーカスイベント
	const [isAddNovel, setIsAddNovel] = useState(false);
	const inputFocus = useRef<HTMLInputElement>(null);

	const focusEvent = () => {
		inputFocus.current.focus();
		setIsFocus(false);
	};

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const onInputTitle = (value = "無題") => {
		const newDraft = [
			...draft,
			{
				title: value,
				body: "",
				userName: "名無し"
			}
		];
		setDraft(newDraft);
		setValue("");
		setIsAddNovel(true);
	};

	useEffect(() => {
		const lastIndex = draft.length - 1;
		selectFlug.toggleFlugOneOfTheArrays(draft, lastIndex);
		setIsAddNovel(false);
	}, [isAddNovel]);

	useEffect(() => {
		setIsSelectArray(selectFlug.booleanArray);
	}, [selectFlug.booleanArray]);

	useEffect(() => {
		if (isSelectedReset) {
			selectFlug.toggleFlugOneOfTheArrays(draft);
			setSelectedReset(false);
		}
	}, [isSelectedReset]);

	useEffect(() => {
		if (isFocus) {
			focusEvent();
		}
	}, [isFocus]);

	return (
		<>
			<VStack p={6}>
				<Center>
					<HStack>
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
							onKeyDown={(e) => e.key === "Enter" && onInputTitle(value === "" ? undefined : value)}
							onFocus={() => selectFlug.toggleFlugOneOfTheArrays(draft)}
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
										onClick={
											selectFlug.booleanArray[index]
												? () => selectFlug.toggleFlugOneOfTheArrays(draft)
												: () => selectFlug.toggleFlugOneOfTheArrays(draft, index)
										}
										sx={
											selectFlug.booleanArray[index]
												? undefined
												: { _hover: { shadow: "lg", color: "gray.500", cursor: "pointer" } }
										}
										shadow={selectFlug.booleanArray[index] ? "2xl" : "none"}
										h={selectFlug.booleanArray[index] ? (item.body === "" ? "128px" : "163px") : "100px"}
										color={selectFlug.booleanArray[index] ? "gray.700" : "gray.400"}
										marginBottom={selectFlug.booleanArray[index] ? 8 : 1}
										// ここから下は固定値、上は受け取った真偽値によって変化
										paddingTop={2}
										w={"250px"}
										backgroundColor={"red.200"}
										marginTop={3}
										borderRadius={5}
										border={"none"}
										transitionProperty="all"
										transitionDuration="0.8s"
										transitionTimingFunction={"ease-out"}
										fontWeight={"normal"}
										textAlign={"center"}
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												selectFlug.booleanArray[index]
													? selectFlug.toggleFlugOneOfTheArrays(draft)
													: selectFlug.toggleFlugOneOfTheArrays(draft, index);
											}
										}}
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
											<DraftControllButton
												isAccordionOpen={selectFlug.booleanArray[index]}
												deleteAction={deleteAction}
											/>
										</VStack>
									</Box>
								</Center>
							);
					  })
					: undefined}
				<IconButton
					aria-label="titleInput"
					icon={<ImQuill />}
					color={"orange.500"}
					backgroundColor={"red.200"}
					border={"none"}
					width={"250px"}
					onClick={() => {
						focusEvent();
					}}
				/>
			</VStack>
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
