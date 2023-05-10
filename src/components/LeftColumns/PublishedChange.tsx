import { useRecoilValue } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { useDraft } from "../../hooks/useDraft";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";
import { MdPublicOff, MdPublic } from "react-icons/md";
import { memo } from "react";

export const PublishedChange = memo(() => {
	const selectedDraft = useRecoilValue(editorState);

	const { onPublishedChange } = useDraft();
	return (
		<PrimaryIconButton
			aria-label="downloadText"
			icon={selectedDraft ? selectedDraft.isPublished ? <MdPublic /> : <MdPublicOff /> : <MdPublicOff />}
			colorScheme={selectedDraft ? (selectedDraft.isPublished ? "green" : "gray") : "gray"}
			focusOutline={"none"}
			isDisabled={selectedDraft && selectedDraft.lengthOver}
			onClick={(e) => {
				onPublishedChange();
				e.stopPropagation(); //親要素へのバブリングを停止
			}}
		/>
	);
});
PublishedChange.displayName = "PublishedChange";
