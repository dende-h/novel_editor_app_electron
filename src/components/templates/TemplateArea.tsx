import { Box, Grid } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";
import { LeftColumnArea } from "../molecule/LeftColumnArea";
import { Footer } from "../organism/Footer";
import { Header } from "../organism/Header";

type Props = {
	children: ReactNode;
};

const TemplateArea: VFC<Props> = memo((props: Props) => {
	const { children } = props;
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
				<Box gridArea="left" bg="red.200">
					<LeftColumnArea />
				</Box>
				<Box gridArea="main" bg="blue.500">
					{children}
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
export default TemplateArea;

TemplateArea.displayName= "TemplateArea"