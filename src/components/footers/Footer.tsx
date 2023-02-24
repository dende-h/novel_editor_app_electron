import { Box, Center, IconButton } from "@chakra-ui/react";
import { memo } from "react";
import { ImPlus, ImPointUp } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";
import { useDraft } from "../../hooks/useDraft";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";

export const Footer = memo(() => {
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel } = useDraft();
	return (
		<>
			<Box width={"full"} bgColor={"gray.300"}>
				<IconButton
					size={"lg"}
					position={"fixed"}
					bottom={"30px"}
					left={"30px"}
					shadow={"lg"}
					transitionProperty="all"
					transitionDuration="0.8s"
					transitionTimingFunction={"ease-out"}
					aria-label="scrollTop"
					_focus={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
					_hover={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
					icon={<ImPointUp />}
					color={"brown"}
					backgroundColor={"orange.100"}
					opacity={"0.6"}
					border={"none"}
					borderRadius={"full"}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				/>
				<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"30px"} right={"30px"}>
					{isSelect ? (
						<DrawerLeftArea colorScheme={"teal"} size={"lg"} />
					) : (
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
