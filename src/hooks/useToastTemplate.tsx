import { useToast } from "@chakra-ui/react";

//真偽値のフラグ切替などに利用するカスタムフック
export const useToastTemplate = () => {
	const toast = useToast();

	const praimaryErrorToast = (word: string) => {
		toast({
			title: word,
			position: "top",
			isClosable: true,
			status: "error",
			duration: 3000
		});
	};

	const praimaryInfoToast = (word: string) => {
		toast({
			title: word,
			position: "top",
			isClosable: true,
			status: "info",
			duration: 3000
		});
	};

	const toastCloseAll = () => {
		toast.closeAll();
	};

	return { praimaryInfoToast, praimaryErrorToast, toastCloseAll };
};
