import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Divider,
	Heading,
	HStack,
	SimpleGrid,
	Text,
	useColorModeValue,
	VStack
} from "@chakra-ui/react";
import format from "date-fns/format";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { isClientState } from "../globalState/atoms/isClientState";
import { lastEditedTimeSort } from "../globalState/selector/lastEditedTimeSort";
import "@fontsource/noto-serif-jp";
import { cursorTo } from "readline";

export default function Drafts() {
	const isClient = useRecoilValue(isClientState);
	const drafts = useRecoilValue(lastEditedTimeSort);
	const titleBgColor = useColorModeValue(
		"linear(to-r,gray.100,gray.200,gray.300,gray.200,gray.100)",
		"linear(to-r,gray.500,gray.600,gray.700,gray.600,gray.500)"
	);
	const dividerColor = useColorModeValue("white", "black");
	const bookCoverColor = useColorModeValue(
		"linear(to-r, green.500,green.600,green.700 ,green.700, green.700,green.600,green.500)",
		"linear(to-r, green.400,green.500,green.600 ,green.600, green.600,green.500,green.400)"
	);
	const css = { "writing-mode": "vertical-rl", "text-orientation": "upright" };

	return (
		<>
			<Head>
				<title>原稿一覧</title>
				<meta name="description" content="原稿一覧" />
			</Head>
			{isClient ? (
				<Box h={"90vh"}>
					<Box
						p={"10px"}
						borderRadius={"sm"}
						margin={2}
						shadow={"2xl"}
						bgGradient="linear-gradient(-60deg, yellow.700,yellow.800,yellow.800,yellow.900,
							yellow.800,yellow.800,yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,
							yellow.800,yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,yellow.800,
							yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,yellow.800,yellow.700)"
					>
						<Box
							p={3}
							overflowY="scroll"
							bgColor={"burlywood"}
							borderRadius={"sm"}
							borderWidth="3px"
							borderColor={"yellow.900"}
							bgGradient="linear-gradient(-60deg, yellow.900,yellow.800,yellow.800,yellow.900,
								yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900,yellow.800,yellow.800,
								yellow.900,yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900,yellow.800,
								yellow.800,yellow.900,yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900)"
						>
							<SimpleGrid spacingY={4} templateColumns="repeat(auto-fill, minmax(42px, 42px))" minH={"200px"}>
								{drafts.map((item, index) => {
									return (
										<Center
											key={index}
											w={"40px"}
											h={"150px"}
											p={1}
											position="relative"
											borderTopColor={"green.500"}
											borderTopWidth={"1px"}
											borderRightColor={"green.700"}
											borderRightWidth={"1px"}
											borderLeftColor={"green.700"}
											borderLeftWidth={"1px"}
											borderBottomColor={"green.800"}
											borderBottomWidth={"2px"}
											borderTopRadius={"3px"}
											borderBottomRadius={"2px"}
											opacity={0.9}
											_hover={{ opacity: 1, shadow: "dark-lg", cursor: "pointer" }}
											bgGradient={bookCoverColor}
										>
											<VStack>
												<Divider
													borderWidth={"2px"}
													borderColor={dividerColor}
													position={"absolute"}
													top={1}
													w={"34px"}
												/>
												<Divider
													borderWidth={"2px"}
													borderColor={dividerColor}
													position={"absolute"}
													top={1}
													w={"34px"}
												/>
												<Heading
													sx={css}
													fontFamily={"Noto Serif JP"}
													textOverflow={"ellipsis"}
													overflow={"hidden"}
													whiteSpace={"nowrap"}
													size="sm"
													paddingX={"3px"}
													paddingY={"15px"}
													bgGradient={titleBgColor}
													borderWidth={"1px"}
													borderRadius={"1px"}
												>
													{item.title}
												</Heading>
											</VStack>
										</Center>
									);
								})}
							</SimpleGrid>
						</Box>
					</Box>
				</Box>
			) : undefined}
		</>
	);
}
