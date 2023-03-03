import { Box, Divider, Flex, Heading, Spacer, VStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { ChangeUserNameModal } from "../components/profilePage/ChangeUserNameModal";
import { userProfileItem } from "../constant/constant";
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
					<VStack>
						{profileArray.map((item, index) => {
							return (
								<Box key={index}>
									<Divider />
									<Flex>
										<Heading as={"h3"}>{item.heading}</Heading>
										<Spacer />
										<Text>
											`${item.description} $
											{index === 1 ? undefined : index === 2 || index === 3 ? "Drafts" : "Characters"}`
										</Text>
									</Flex>
									<Divider />
								</Box>
							);
						})}
					</VStack>
				</Box>
			) : undefined}
		</>
	);
}
