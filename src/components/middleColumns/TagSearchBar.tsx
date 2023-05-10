import { Input, HStack, Center, Text, useColorModeValue, Box, Tooltip } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { ImCancelCircle, ImPlus } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { tagSearchState } from "../../globalState/atoms/tagSearchState";
import { allTagsArray } from "../../globalState/selector/allTagsArray";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useEnterKeyEvent } from "../../hooks/useEnterKeyEvent";
import { useInput } from "../../hooks/useInput";
import { useToastTemplate } from "../../hooks/useToastTemplate";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const TagSearchBar = memo(() => {
	const { setConposing, onEnterKeySubmitEvent } = useEnterKeyEvent();
	const { praimaryErrorToast } = useToastTemplate();
	const { onChangeInputForm, value, setValue } = useInput();
	const [tags, setTags] = useRecoilState<string[]>(tagSearchState);
	const allTags = useRecoilValue(allTagsArray);

	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");

	const { calcCharCount, charCount } = useCalcCharCount();
	const maxLength = 12;

	const onEnterKeyUp = () => {
		if (value.length === 0) {
			praimaryErrorToast("入力がありません");
		} else {
			onClickAddTagsButton();
		}
	};

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	const onClickAddTagsButton = () => {
		const duplicateCheckArray = tags.filter((item) => {
			return item !== value;
		});
		if (tags.length > duplicateCheckArray.length) {
			praimaryErrorToast("重複することはできません");
		} else {
			const newTags = [...tags, value];
			const tagArrayMaxLength = 4;
			if (newTags.length < tagArrayMaxLength + 1) {
				setTags(newTags);
			} else {
				praimaryErrorToast("Tagは4つまでしか設定できません");
			}
		}

		setValue("");
	};

	const onClickTagDelete = (deleteIndex: number) => {
		setTags(tags.filter((_, index) => index !== deleteIndex));
	};

	const tooltipText =
		value !== ""
			? allTags.filter((item) => {
					return item.includes(value);
			  })
			: "未設定";

	return (
		<>
			<Box>
				<Center padding={2} marginBottom={2} w={"100%"}>
					<HStack position={"relative"} zIndex={1}>
						<Tooltip
							hasArrow
							label={tooltipText.length === 0 ? "候補：なし" : `候補：${tooltipText.toString()}`}
							placement={"top-start"}
							isOpen={charCount !== 0}
						>
							<Input
								value={value}
								placeholder={"タグで絞り込みが出来ます"}
								onChange={onChangeInputForm}
								maxLength={maxLength}
								overflow={"hidden"}
								w={"300px"}
								onCompositionStart={() => {
									setConposing(true);
								}}
								onCompositionEnd={() => {
									setConposing(false);
								}}
								onKeyUp={(e) => {
									onEnterKeySubmitEvent(e, onEnterKeyUp);
								}}
								_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
							/>
						</Tooltip>
						<PrimaryIconButton
							isDisabled={value.length === 0}
							isDisableHoverAnimation={value.length === 0}
							icon={<ImPlus />}
							colorScheme={"twitter"}
							aria-label="addTagsButton"
							onClick={onClickAddTagsButton}
						/>
						<Text position={"absolute"} top={2} left={"245px"} zIndex={2}>
							{charCount}/{maxLength}
						</Text>
					</HStack>
				</Center>

				<HStack spacing={0} w={"100%"}>
					{tags.map((item, index) => {
						return (
							<HStack spacing={0} key={index} w={"25%"}>
								<PrimaryIconButton
									icon={<ImCancelCircle />}
									colorScheme={"red"}
									onClick={() => onClickTagDelete(index)}
									aria-label="tagSearch"
									focusOutline="none"
									variant={"ghost"}
									boxsize={5}
								/>
								<Text
									w={"80%"}
									fontStyle={"italic"}
									fontWeight={"bold"}
									fontSize={{ base: "12px", md: "16px", lg: "26px" }}
									textOverflow={"ellipsis"}
									overflow={"hidden"}
									whiteSpace={"nowrap"}
								>
									{item}
								</Text>
							</HStack>
						);
					})}
				</HStack>
			</Box>
		</>
	);
});
TagSearchBar.displayName = "TagSearchBar";
