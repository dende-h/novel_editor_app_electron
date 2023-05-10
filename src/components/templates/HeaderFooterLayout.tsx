import { Grid, GridItem } from "@chakra-ui/react";
import { Footer } from "../footers/Footer";
import { Header } from "../headers/Header";
import { LeftMenuBar } from "../leftMenuBar/LeftMenuBar";

export const HeaderFooterLayout = ({ children }) => {
	return (
		<>
			<Grid
				gridTemplateColumns={{ base: "1fr", lg: "55px 1fr" }}
				gridTemplateRows={"auto 100% auto"}
				gridTemplateAreas={{ base: `"header"  'main' "footer"`, lg: `"left header" "left main" "left footer"` }}
			>
				<GridItem area="header">
					<Header />
				</GridItem>
				<GridItem area="left" display={{ base: "none", lg: "block" }}>
					<LeftMenuBar />
				</GridItem>
				<GridItem area="main">{children}</GridItem>
				<GridItem area="footer">
					<Footer />
				</GridItem>
			</Grid>
		</>
	);
};
