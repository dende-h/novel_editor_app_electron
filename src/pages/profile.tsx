import { Box, Divider, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { ChangeUserNameModal } from "../components/profilePage/ChangeUserNameModal";
import { isClientState } from "../globalState/atoms/isClientState";
import { userName } from "../globalState/atoms/userName";

export default function Profile() {
	const isClient = useRecoilValue(isClientState);
	const userPenName = useRecoilValue(userName);

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
				</Box>
			) : undefined}
		</>
	);
}
