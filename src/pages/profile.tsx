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
				<Box textAlign={"center"} p={6} h={"100vh"}>
					<Divider borderWidth="2px" />
					<Divider marginTop={1} marginLeft={0.5} />

					<Heading
						w={"auto"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
					>
						{userPenName}の書斎
					</Heading>

					<Divider marginBottom={1} marginLeft={0.5} />
					<Divider borderWidth="2px" />
					<Box textAlign={"end"}>
						<ChangeUserNameModal />
					</Box>
					<VStack padding={4}>
						{profileArray.map((item, index) => {
							return (
								<Card key={index} w={{ base: "350px", md: "400px", lg: "600px" }} h={"auto"}>
									<CardBody>
										<Flex>
											<Heading as={"h5"} fontSize={{ base: "lg", lg: "x-large" }}>
												{item.heading}
											</Heading>
											<Spacer />
											<HStack>
												<Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>{item.description}</Text>
												<Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>
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
