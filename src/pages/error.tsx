import Head from "next/head";
import Link from "next/link";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";

export default function Error() {
	return (
		<>
			<Head>
				<title>Error</title>
				<meta name="description" content="問い合わせの送信が失敗しました" />
			</Head>

			<Box textAlign="center" marginTop={"50px"} h={"90vh"}>
				<VStack spacing={4}>
					<Heading as="h1" fontSize="3xl" mb="4">
						Error!
					</Heading>
					<Text>送信エラーが発生しました。</Text>
					<Text>暫く経ってからお問い合わせください。</Text>
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
