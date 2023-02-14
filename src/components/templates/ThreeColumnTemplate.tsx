import { Box, Grid } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { Footer } from "../footers/Footer";
import { Header } from "../headers/Header";
import { EditorArea } from "../middleColumns/EditorArea";

const ThreeColumnTemplate: VFC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={"1fr 4fr 1fr"}
				gridTemplateRows={"auto"}
				gridTemplateAreas={`'header header header' 'left main right' 'footer footer footer'`}
				gap={1}
			>
				<Box gridArea="header" bg="gray.500">
					<Header />
				</Box>
				<Box gridArea="left" bg="gray.200">
					<LeftColumnArea />
				</Box>
				<Box gridArea="main" bg="gray.200">
					<EditorArea />
				</Box>
				<Box gridArea="right" bg="green.500">
					rightcard
				</Box>
				<Box gridArea="footer" bg="gray.500">
					<Footer />
				</Box>
			</Grid>
		</>
	);
});
export default ThreeColumnTemplate;

ThreeColumnTemplate.displayName = "TemplateArea";
