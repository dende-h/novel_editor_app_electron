import { Box, Grid, GridItem } from "@chakra-ui/react";
import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { EditorArea } from "../middleColumns/EditorArea";

const TwoColumnTemplate: FC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", lg: " 355px 1fr" }}
				gridTemplateRows={"90vh"}
				gridTemplateAreas={{ base: ` 'main' `, lg: `" left main"` }}
			>
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
