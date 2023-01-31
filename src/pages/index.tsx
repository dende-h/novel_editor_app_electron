import { NextPage } from "next";
import { EditorArea } from "../components/middleColumns/EditorArea";
import ThreeColumnTemplate from "../components/templates/ThreeColumnTemplate";

const Index: NextPage = () => {
	return (
		<>
			<ThreeColumnTemplate>
				<EditorArea />
			</ThreeColumnTemplate>
		</>
	);
};

export default Index;
