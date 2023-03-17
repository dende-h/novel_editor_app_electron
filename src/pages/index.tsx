import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";

const Index: NextPage = () => {
	return (
		<>
			<Head>
				<title>Write Novel Now</title>
				<meta
					name="description"
					content="短い小説を繰り返し書いて、小説のトレーニングをすることを目的とした小説ライターアプリです。"
				/>
			</Head>
			<Box>
				<TwoColumnTemplate />
			</Box>
		</>
	);
};

export default Index;
