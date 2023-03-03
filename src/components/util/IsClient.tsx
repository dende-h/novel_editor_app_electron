import { memo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";

export const IsClient = memo(() => {
	const setIsClient = useSetRecoilState<boolean>(isClientState);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);
	return <></>;
});

IsClient.displayName = "IsClient";
