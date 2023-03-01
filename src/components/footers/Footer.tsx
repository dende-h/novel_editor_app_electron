import { Box, Center, IconButton } from "@chakra-ui/react";
import { memo } from "react";
import { ImPlus } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";
import { useDraft } from "../../hooks/useDraft";

export const Footer = memo(() => {
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel } = useDraft();
	return (
		<>
			<Box width={"full"} bgColor={"gray.300"}>
				<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"30px"} right={"30px"}>
					{isSelect ? undefined : (
						<IconButton
							icon={<ImPlus />}
							aria-label="openDrawer"
							onClick={onAddNovel}
							colorScheme="teal"
							borderRadius={"full"}
						/>
					)}
				</Box>

				<Center>©2022 dende-h</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
