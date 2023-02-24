import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";

const Index: NextPage = () => {
	return (
		<>
			<Box>
				<TwoColumnTemplate />
			</Box>
		</>
	);
};

export default Index;
