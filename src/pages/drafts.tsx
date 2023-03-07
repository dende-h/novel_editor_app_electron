import { Button, Card, CardBody, CardFooter, CardHeader, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import format from "date-fns/format";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { isClientState } from "../globalState/atoms/isClientState";
import { lastEditedTimeSort } from "../globalState/selector/lastEditedTimeSort";

export default function Drafts() {
	const isClient = useRecoilValue(isClientState);
	const drafts = useRecoilValue(lastEditedTimeSort);

	return (
		<>
			<Head>
				<title>原稿一覧</title>
				<meta name="description" content="原稿一覧" />
			</Head>
			{isClient ? (
				<SimpleGrid
					spacing={4}
					templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
					h={"100%"}
					padding={5}
					overflow="scroll"
				>
					{drafts.map((item, index) => {
						return (
							<Card key={index} colorScheme={"facebook"} position={"relative"}>
								<CardHeader>
									<Heading textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} size="md">
										{item.title}
									</Heading>
								</CardHeader>
								<CardBody>
									<Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} fontSize={"sm"}>
										{item.body}
									</Text>
								</CardBody>
								<CardFooter>
									<Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} fontSize={"sm"}>
										{format(new Date(item.lastEditedTime), "yyyy/MM/dd-HH:mm")}
									</Text>
									<Button size={"sm"} colorScheme={"telegram"} position={"absolute"} bottom={"10px"} right={"10px"}>
										Viwe
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</SimpleGrid>
			) : undefined}
		</>
	);
}
