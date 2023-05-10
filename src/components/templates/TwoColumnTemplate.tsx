import { Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, FC } from "react";
import { LeftColumnArea } from "../LeftColumns/LeftColumnArea";
import { EditorArea } from "../middleColumns/EditorArea";
import { ProfileArea } from "../profilePage/ProfileArea";

const TwoColumnTemplate: FC = memo(() => {
	const router = useRouter();
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
					{router.pathname === "/" && <EditorArea />}
					{router.pathname === "/profile" && <ProfileArea />}
				</GridItem>
			</Grid>
		</>
	);
});
export default TwoColumnTemplate;

TwoColumnTemplate.displayName = "TemplateArea";
