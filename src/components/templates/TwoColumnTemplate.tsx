import { Box, Grid, GridItem } from "@chakra-ui/react";
import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { EditorArea } from "../middleColumns/EditorArea";
import { RightMenuBar } from "../rightColumuns/RightMenuBar";

const TwoColumnTemplate: FC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", lg: "55px 300px 63%", xl: "55px 320px 69%", xxl: "55px 330px 75%" }}
				gridTemplateRows={"100vh"}
				gridTemplateAreas={{ base: ` 'main' `, lg: `"bar left main"` }}
				gap={1}
			>
				<GridItem area="bar" display={{ base: "none", lg: "block" }}>
					<Box bgColor={"blackAlpha.800"} position={"fixed"} zIndex={3} h={"100vh"} top={0} left={0} w={"55px"}>
						<RightMenuBar />
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
