import { Box, Divider, Heading, HStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { ChangeUserNameModal } from "../components/profilePage/ChangeUserNameModal";
import { userName } from "../globalState/atoms/userName";

export default function Profile() {
	const userPenName = useRecoilValue(userName);

	return (
		<>
			<Head>
				<title>ユーザープロフィール</title>
				<meta name="description" content="ユーザープロフィール" />
			</Head>
			<Box textAlign={"center"} p={6} h={"100vh"}>
				<Divider borderColor={"gray.700"} borderWidth="2px" />
				<Divider borderColor={"gray.600"} marginTop={1} marginLeft={0.5} />

				<Heading
					w={"auto"}
					textOverflow={"ellipsis"}
					overflow={"hidden"}
					whiteSpace={"nowrap"}
					fontSize={{ base: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
				>
					{userPenName}の書斎
				</Heading>

				<Divider borderColor={"gray.600"} marginBottom={1} marginLeft={0.5} />
				<Divider borderColor={"gray.700"} borderWidth="2px" />
				<Box textAlign={"end"}>
					<ChangeUserNameModal />
				</Box>
			</Box>
		</>
	);
}
