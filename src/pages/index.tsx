import { NextPage } from "next";
import { EditorArea } from "../components/molecule/EditorArea";
import TemplateArea from "../components/templates/TemplateArea";

const Index: NextPage = () => {
	return (
		<>
			<TemplateArea>
				<EditorArea />
			</TemplateArea>
		</>
	);
};

export default Index;
