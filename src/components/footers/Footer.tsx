import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";

export const Footer = memo(() => {
	//ライトテーマとダークテーマの背景色の切替
	const footerBgColor = useColorModeValue("gray.300", "gray.700");

	//固定のfooter
	return (
		<>
			<Box width={"full"} bgColor={footerBgColor} h={"43px"}>
				<Flex justify="center">
					<Link href="/contact" passHref>
						<Box mr={4}>
							<Heading as="h4" fontSize="sm">
								お問い合わせ
							</Heading>
						</Box>
					</Link>
					<Link href="/policy" passHref>
						<Box>
							<Heading as="h4" fontSize="sm">
								プライバシーポリシー
							</Heading>
						</Box>
					</Link>
				</Flex>
				<Center>©2023 dende-h</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
