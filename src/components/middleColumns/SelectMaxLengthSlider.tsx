import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { numberOfCharacters } from "../../constant/constant";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { draftObjectArray } from "../../globalState/atoms/drafts";

type Props = { maxLength: number };

export const SelectMaxLengthSlider = memo((props: Props) => {
	const { maxLength } = props;
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [draftLength, setDraftLength] = useRecoilState<draftObjectArray>(drafts);
	const { veryShortNovel, shortShortNovel, shortNovel } = numberOfCharacters;
	const minCharCount = 400;
	const maxCharCount = shortNovel;
	const [showTooltip, setShowTooltip] = useState(false);

	const onChangeMaxLength = (setLength: number) => {
		setDraftLength(draftLength.map((item) => (item.isSelected ? { ...item, maxLength: setLength * 100 } : item)));
	};

	return (
		<>
			{isClient ? (
				<Slider
					id="slider"
					defaultValue={maxLength / 100}
					min={minCharCount / 100}
					max={maxCharCount / 100}
					step={2}
					colorScheme="teal"
					onChange={onChangeMaxLength}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					w={"90%"}
				>
					<SliderMark value={12} mt="1" ml="-2.5" fontSize="xs">
						1200
					</SliderMark>
					<SliderMark value={60} mt="1" ml="-2.5" fontSize="xs">
						6000
					</SliderMark>
					<SliderMark value={240} mt="1" ml="-2.5" fontSize="xs">
						24000
					</SliderMark>
					<SliderTrack bgColor={"facebook.200"}>
						<SliderFilledTrack />
					</SliderTrack>
					<Tooltip
						hasArrow
						bg="gray.600"
						placement="top"
						isOpen={showTooltip}
						label={
							selectedDraft.maxLength <= veryShortNovel
								? "掌編"
								: selectedDraft.maxLength <= shortShortNovel
								? "SS"
								: "短編"
						}
					>
						<SliderThumb boxSize={4} />
					</Tooltip>
				</Slider>
			) : undefined}
		</>
	);
});
SelectMaxLengthSlider.displayName = "SelectMaxLengthSlider";
