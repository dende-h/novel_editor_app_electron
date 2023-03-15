import { Box, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { isClientState } from "../globalState/atoms/isClientState";
import { lastEditedTimeSort } from "../globalState/selector/lastEditedTimeSort";
import "@fontsource/noto-serif-jp";
import { DraftViweModal } from "../components/middleColumns/DraftViweModal";
import { TagSearchBar } from "../components/middleColumns/TagSearchBar";
import { viweDraftsSelector } from "../globalState/selector/viweDraftsSelector";

export default function Drafts() {
	const isClient = useRecoilValue(isClientState);
	const drafts = useRecoilValue(lastEditedTimeSort);
	const searchTagsDrafts = useRecoilValue(viweDraftsSelector);

	return (
		<>
			<Head>
				<title>原稿一覧</title>
				<meta name="description" content="原稿一覧" />
			</Head>
			{isClient ? (
				<>
					<Box h={"12vh"} w={"100%"}>
						<TagSearchBar />
					</Box>
					<Box h={"80vh"}>
						<Box
							h={"100%"}
							p={"10px"}
							borderRadius={"sm"}
							margin={2}
							shadow={"2xl"}
							bgGradient="linear-gradient(-60deg, yellow.700,yellow.800,yellow.800,yellow.900,
							yellow.800,yellow.800,yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,
							yellow.800,yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,yellow.800,
							yellow.700,yellow.700,yellow.800,yellow.800,yellow.900,yellow.800,yellow.800,yellow.700)"
						>
							<Box
								paddingX={1}
								h={"100%"}
								overflowY="scroll"
								borderRadius={"sm"}
								borderWidth="3px"
								borderColor={"yellow.900"}
								bgGradient="linear-gradient(-60deg, yellow.900,yellow.800,yellow.800,yellow.900,
								yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900,yellow.800,yellow.800,
								yellow.900,yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900,yellow.800,
								yellow.800,yellow.900,yellow.900,yellow.900,yellow.800,yellow.800,yellow.900,yellow.900)"
								position={"relative"}
							>
								<Box
									p={3}
									h={"100%"}
									background="rgba(0,0,0,0.2)"
									borderRadius={"sm"}
									borderTop={"3px"}
									borderBottom={"1px"}
									borderColor="yellow.900"
									position={"sticky"}
								>
									<SimpleGrid spacingY={4} templateColumns="repeat(auto-fill, minmax(42px, 42px))" minH={"200px"}>
										{searchTagsDrafts.length > 0
											? searchTagsDrafts.map((item, index) => {
													return <DraftViweModal key={index} title={item.title} body={item.body} />;
											  })
											: drafts.map((item, index) => {
													return <DraftViweModal key={index} title={item.title} body={item.body} />;
											  })}
									</SimpleGrid>
								</Box>
							</Box>
						</Box>
					</Box>
				</>
			) : undefined}
		</>
	);
}
