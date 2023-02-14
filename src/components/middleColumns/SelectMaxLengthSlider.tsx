import {
	Slider,
	SliderMark,
	SliderTrack,
	SliderFilledTrack,
	Tooltip,
	SliderThumb,
	UseSliderProps
} from "@chakra-ui/react";
import { count } from "console";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { drafts } from "../../globalState/atoms/drafts";
import { selectedFlugArray } from "../../globalState/atoms/selectedFlugArray";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { draftObjectArray } from "../LeftColumns/LeftColumnArea";

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
	const selectedFlug = useRecoilValue(selectedFlugArray);
	const [draftLength, setDraftLength] = useRecoilState<draftObjectArray>(drafts);
	const minCharCount = 400;
	const maxCharCount = 18000;
	const veryShortNovel = 1200;
	const ssNovel = 6000;
	const [sliderValue, setSliderValue] = useState(5);
	const [showTooltip, setShowTooltip] = useState(false);

	const onChangeMaxLength = (e: number) => {
		const selectedIndex = selectedFlug.indexOf(true);
		setDraftLength(
			draftLength.map((item, index) => (index === selectedIndex ? { ...item, maxLength: e * 100 } : item))
		);
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
					w={"75%"}
				>
					<SliderMark value={12} mt="1" ml="-2.5" fontSize="sm">
						1200
					</SliderMark>
					<SliderMark value={60} mt="1" ml="-2.5" fontSize="sm">
						6000
					</SliderMark>
					<SliderMark value={180} mt="1" ml="-2.5" fontSize="sm">
						18000
					</SliderMark>
					<SliderTrack>
						<SliderFilledTrack />
					</SliderTrack>
					<Tooltip
						hasArrow
						bg="gray.400"
						color="gray.200"
						placement="top"
						isOpen={showTooltip}
						label={
							selectedDraft.maxLength <= veryShortNovel ? "掌編" : selectedDraft.maxLength <= ssNovel ? "SS" : "短編"
						}
					>
						<SliderThumb boxSize={4} />
					</Tooltip>
				</Slider>
			) : undefined}
		</>
	);
};
