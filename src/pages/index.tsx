import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Seo from "../components/util/Seo";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";

const Index: NextPage = () => {
	return (
		<>
			<Seo
				pageTitle={null}
				pageDescription={null}
				pagePath="https://next-novel-editor.vercel.app/"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box>
				<TwoColumnTemplate />
			</Box>
		</>
	);
};

export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};

export default Index;
