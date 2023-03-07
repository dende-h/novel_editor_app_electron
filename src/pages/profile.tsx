import { Box, Divider, Flex, Heading, Spacer, VStack, Text, Card, CardBody, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { ChangeUserNameModal } from "../components/profilePage/ChangeUserNameModal";
import { isClientState } from "../globalState/atoms/isClientState";

import { userName } from "../globalState/atoms/userName";
import { profileItem } from "../globalState/selector/profileItem";

export default function Profile() {
	const isClient = useRecoilValue(isClientState);
	const userPenName = useRecoilValue(userName);
	const profileArray = useRecoilValue(profileItem);

	return (
		<>
			<Head>
				<title>ユーザープロフィール</title>
				<meta name="description" content="ユーザープロフィール" />
			</Head>
			{isClient ? (
				<Box textAlign={"center"} paddingY={4} h={"auto"} w={"100%"}>
					<Divider borderWidth="2px" w={"auto"} />
					<Divider marginTop={1} marginLeft={0.5} w={"auto"} />

					<Heading
						w={"100%"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontSize={{ base: "md", md: "xl", lg: "2xl", xl: "3xl" }}
					>
						{userPenName}の書斎
					</Heading>

					<Divider marginBottom={1} marginLeft={0.5} w={"auto"} />
					<Divider borderWidth="2px" w={"auto"} />
					<Box textAlign={"end"}>
						<ChangeUserNameModal />
					</Box>
					<VStack padding={3} h={"auto"}>
						{profileArray.map((item, index) => {
							return (
								<Card key={index} w={{ base: "240px", md: "400px", lg: "600px" }} h={"auto"}>
									<CardBody>
										<Flex>
											<Heading as={"h5"} fontSize={{ base: "md", lg: "x-large" }}>
												{item.heading}
											</Heading>
											<Spacer />
											<HStack>
												<Text fontSize={{ base: "sm", md: "md", lg: "xl" }}>{item.description}</Text>
												<Text fontSize={{ base: "sm", md: "md", lg: "xl" }}>
													{index === 0
														? undefined
														: index === 1 || index === 2
														? "Drafts"
														: index === 3
														? "Characters"
														: undefined}
												</Text>
											</HStack>
										</Flex>
									</CardBody>
								</Card>
							);
						})}
					</VStack>
				</Box>
			) : undefined}
		</>
	);
}
