import { Box, Grid, GridItem } from "@chakra-ui/react";
import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { EditorArea } from "../middleColumns/EditorArea";

const TwoColumnTemplate: FC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", lg: "55px 400px 1fr" }}
				gridTemplateRows={"auto"}
				gridTemplateAreas={{ base: ` 'main' `, lg: ` 'bar left main' ` }}
				gap={1}
			>
				<GridItem area="bar" display={{ base: "none", lg: "block" }}>
					<Box bgColor={"blackAlpha.500"} position={"fixed"} zIndex={3} h={"100vh"} top={0} left={0} w={"55px"}>
						ハローワールド
					</Box>
				</GridItem>
				<GridItem area="left" display={{ base: "none", lg: "block" }}>
					<LeftColumnArea />
				</GridItem>
				<GridItem area="main">
					<EditorArea />
				</GridItem>
			</Grid>
		</>
	);
});
export default TwoColumnTemplate;

TwoColumnTemplate.displayName = "TemplateArea";
