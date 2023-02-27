import { Box, chakra, Grid, GridItem } from "@chakra-ui/react";

import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { EditorArea } from "../middleColumns/EditorArea";

const TwoColumnTemplate: FC = memo(() => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", lg: "350px 1fr", xl: "400px 1fr" }}
				gridTemplateRows={"auto"}
				gridTemplateAreas={{ base: ` 'main' `, lg: ` 'left main' ` }}
				gap={1}
			>
				<GridItem area="left" bg="gray.200" display={{ base: "none", lg: "block" }}>
					<LeftColumnArea />
				</GridItem>
				<GridItem area="main" bg="gray.200">
					<EditorArea />
				</GridItem>
			</Grid>
		</>
	);
});
export default TwoColumnTemplate;

TwoColumnTemplate.displayName = "TemplateArea";
