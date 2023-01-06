import { Box } from "@chakra-ui/react";
import { EditorArea } from "../components/molecule/Editor";
import TemplateArea from "../components/templates/TemplateArea";

const Index = () => {
	return (
		<>
			<TemplateArea>
				<Box>Hello</Box>
				<EditorArea />
			</TemplateArea>
		</>
	);
};

export default Index;
