import { Box, Grid, GridItem } from "@chakra-ui/react";
import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { Footer } from "../footers/Footer";
import { Header } from "../headers/Header";
import { EditorArea } from "../middleColumns/EditorArea";

const TwoColumnTemplate: FC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", md: "400px 1fr" }}
				gridTemplateRows={"auto"}
				gridTemplateAreas={{ base: `'header' 'main' 'footer'`, md: `'header header' 'left main' 'footer footer'` }}
				gap={1}
			>
				<GridItem area="header" bg="gray.500">
					<Header />
				</GridItem>
				<GridItem area="left" bg="gray.200" display={{ base: "none", md: "block" }}>
					<LeftColumnArea />
				</GridItem>
				<GridItem area="main" bg="gray.200" minH={"942px"}>
					<EditorArea />
				</GridItem>
				{/* <Box gridArea="right" bg="gray.200"></Box> */}
				<GridItem area="footer" bg="gray.500">
					<Footer />
				</GridItem>
			</Grid>
		</>
	);
});
export default TwoColumnTemplate;

TwoColumnTemplate.displayName = "TemplateArea";
