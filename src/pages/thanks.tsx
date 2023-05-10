import Head from "next/head";
import Link from "next/link";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";

export default function Thanks() {
	return (
		<>
			<Head>
				<title>Thank you</title>
				<meta name="description" content="問い合わせの送信が成功しました" />
			</Head>

			<Box textAlign="center" marginTop={"50px"} h={"90vh"}>
				<VStack spacing={4}>
					<Heading as="h1" fontSize="3xl" mb="4">
						Thank you!
					</Heading>
					<Text>お問い合わせありがとうございます。</Text>
					<Text>回答までしばらくお待ちください。</Text>
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
