import { Slider, SliderMark, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { numberOfCharacters } from "../../constant/constant";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { draftObjectArray } from "../../globalState/atoms/drafts";

type Props = { maxLength: number };

export const SelectMaxLengthSlider = (props: Props) => {
	const { maxLength } = props;
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);

	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [draftLength, setDraftLength] = useRecoilState<draftObjectArray>(drafts);
	const minCharCount = 400;
	const maxCharCount = 18000;
	const { veryShortNovel, shortShortNovel } = numberOfCharacters;
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
					colorScheme="gray"
					onChange={onChangeMaxLength}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					w={{ base: "240px", md: "360px", xl: "500px", xxl: "800px" }}
				>
					<SliderMark value={12} mt="1" ml="-2.5" fontSize="xs">
						1200
					</SliderMark>
					<SliderMark value={60} mt="1" ml="-2.5" fontSize="xs">
						6000
					</SliderMark>
					<SliderMark value={180} mt="1" ml="-2.5" fontSize="xs">
						18000
					</SliderMark>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<Tooltip
						hasArrow
						bg="gray.400"
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
};
