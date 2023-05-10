import { Box, Center, Flex, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";
import { DrawerLeftArea } from "../LeftColumns/DrawerLeftArea";
import { ColorSwitchButton } from "./ColorSwitchButton";
import { HeaderMenu } from "./HeaderMenu";

//ヘッダーコンポーネント
export const Header = memo(() => {
	const headerBgColor = useColorModeValue("gray.300", "gray.700"); //カラーモードごと背景色
	const isSelect = useRecoilValue<boolean>(isSelected); //小説がセレクト状態かどうかのフラグ
	const router = useRouter(); //path判定用にuseRouterを利用

	return (
		<>
			<Flex
				as="header"
				w={"auto"}
				h={"40px"}
				p={1.5}
				position={"relative"}
				zIndex={2}
				align="center"
				justify="space-between"
				bgColor={headerBgColor}
			>
				{/* <Box w={"auto"} bgColor={headerBgColor} h={"40px"} p={1.5} position={"relative"} zIndex={2}> */}
				<Box display={{ base: "block", lg: "none" }}>
					{/* 特定のパス以外はドロワーメニューを表示させない */}
					{(router.pathname === "/" || router.pathname === "/profile") && (
						<DrawerLeftArea colorScheme={isSelect ? "orange" : "gray"} />
					)}
				</Box>
				<Box>
					<Link href={"/"} passHref>
						<Heading
							as={"h1"}
							ml={{ lg: "20px" }}
							fontSize={{ base: "2xl", lg: "3xl" }}
							fontWeight={"light"}
							_hover={{ opacity: 0.8, cursor: "pointer" }}
							fontFamily={"heading"}
							fontStyle={"oblique"}
						>
							Re:terature
						</Heading>
					</Link>
				</Box>

				<Flex display={{ base: "block", lg: "none" }}>
					<ColorSwitchButton aria-label={"darkTheme"} mr={1} boxSize={6} borderRadius={"full"} />

					<HeaderMenu />
				</Flex>

				{/* </Box> */}
			</Flex>
		</>
	);
});

Header.displayName = "Header";
