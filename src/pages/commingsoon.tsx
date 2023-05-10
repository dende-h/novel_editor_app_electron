import Head from "next/head";
import Link from "next/link";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";

export default function Commingsoon() {
	return (
		<>
			<Head>
				<title>Commingsoon</title>
				<meta name="description" content="鋭意作成中" />
			</Head>

			<Box textAlign="center" marginTop={"50px"} h={"90vh"}>
				<VStack spacing={4}>
					<Heading as="h1" fontSize="3xl" mb="4">
						Commingsoon
					</Heading>
					<Text>現在ページ作成中です。</Text>
					<Box>
						<Link href="/" color="blue.500">
							Back to Home
						</Link>
					</Box>
				</VStack>
			</Box>
		</>
	);
}

export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
