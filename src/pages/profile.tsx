import { Box } from "@chakra-ui/react";
import Seo from "../components/util/Seo";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";

export default function Profile() {
	return (
		<>
			<Seo
				pageTitle="ユーザー管理ページ"
				pageDescription="書いた小説の数や文字数を確認したり、小説の公開設定、ペンネーム、自己紹介などの変更ができます"
				pagePath="https://next-novel-editor.vercel.app/profile"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box>
				<TwoColumnTemplate />
			</Box>
		</>
	);
}
export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
