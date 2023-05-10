import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { useDraft } from "../../hooks/useDraft";

export const IsClient = memo(() => {
	const setIsClient = useSetRecoilState<boolean>(isClientState);
	const { selectStateReset } = useDraft();

	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
			selectStateReset();
		}
	}, []);
	return <></>;
});

IsClient.displayName = "IsClient";
