import {
	Box,
	Divider,
	Flex,
	Heading,
	Spacer,
	VStack,
	Text,
	Card,
	CardBody,
	HStack,
	useColorModeValue,
	Button,
	Spinner,
	Tooltip,
	Textarea
} from "@chakra-ui/react";
import Head from "next/head";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { isPublishedState } from "../../globalState/atoms/isPublishedState";
import { lastPublishedTime } from "../../globalState/atoms/lastPublishedTime";
import { userName } from "../../globalState/atoms/userName";
import { profileItem } from "../../globalState/selector/profileItem";
import { publishSettingsDraftsSelector } from "../../globalState/selector/publishSettingsDraftsSelector";
import { useNovelPublished } from "../../hooks/useNovelPublished";
import { useUserIntroductionInput } from "../../hooks/useUserIntroductionInput";
import { ChangeUserNameModal } from "./ChangeUserNameModal";
import { UploadProfileImageModal } from "./UploadProfileImageModal";

export const ProfileArea = memo(() => {
	const isClient = useRecoilValue(isClientState);
	const userPenName = useRecoilValue(userName);
	const profileArray = useRecoilValue(profileItem);
	const backgroundColor = useColorModeValue("gray.100", "gray.600");
	const isPublished = useRecoilValue(isPublishedState);
	const timeStamp = useRecoilValue(lastPublishedTime);
	const { onPublishedNovel, isLoading, stopPublishedNovel, updatePublishedNovel } = useNovelPublished();
	const publishedDrafts = useRecoilValue(publishSettingsDraftsSelector);
	const { onChangeTextArea, textValue } = useUserIntroductionInput();

	return (
		<>
			<Head>
				<title>ユーザープロフィール</title>
				<meta name="description" content="ユーザープロフィール" />
			</Head>
			{isClient ? (
				<Box textAlign={"center"} paddingY={4} h={"90vh"} w={"100%"}>
					<Divider borderWidth="2px" w={"auto"} />
					<Divider marginTop={1} marginLeft={0.5} w={"auto"} />

					<Heading
						w={"100%"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontSize={{ base: "md", md: "xl", lg: "2xl" }}
					>
						{userPenName}の書斎
					</Heading>

					<Divider marginBottom={1} marginLeft={0.5} w={"auto"} />
					<Divider borderWidth="2px" w={"auto"} />
					{isPublished ? undefined : (
						<Box ml={"60%"}>
							<HStack>
								<ChangeUserNameModal />
								<UploadProfileImageModal />
							</HStack>
						</Box>
					)}
					<VStack padding={3} h={"auto"}>
						{profileArray.map((item, index) => {
							return (
								<Card
									key={index}
									w={{ base: "300px", md: "400px", lg: "500px" }}
									h={"auto"}
									backgroundColor={backgroundColor}
								>
									<CardBody>
										<Flex>
											<Heading as={"h5"} fontSize={{ base: "md", lg: "lg" }}>
												{item.heading}
											</Heading>
											<Spacer />
											<HStack>
												<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>{item.description}</Text>
												<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
													{index === 0
														? undefined
														: index === 1 || index === 2 || index === 3
														? "Drafts"
														: index === 4
														? "Characters"
														: undefined}
												</Text>
											</HStack>
										</Flex>
									</CardBody>
								</Card>
							);
						})}
						<Card w={{ base: "300px", md: "400px", lg: "500px" }} h={"auto"} backgroundColor={backgroundColor}>
							<CardBody>
								<Heading as={"h5"} fontSize={"md"}>
									{`自己紹介(${textValue.length}/80文字)`}
								</Heading>
								<Tooltip label={isPublished ? "公開中は編集できません" : "クリックで編集可能です"} placement="top">
									<Textarea
										value={textValue}
										onChange={onChangeTextArea}
										placeholder={"小説公開時に一緒に公開されます"}
										maxLength={80}
										fontSize={"sm"}
										border="none"
										isDisabled={isPublished}
									/>
								</Tooltip>
							</CardBody>
						</Card>
					</VStack>
					{isLoading ? (
						<Box textAlign={"center"} marginTop={5}>
							<Spinner />
						</Box>
					) : (
						<Box textAlign={"center"} marginTop={5}>
							{isPublished ? (
								<Tooltip label={"公開設定を同期します"} placement="top">
									<Button
										colorScheme={"teal"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={updatePublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										追加更新
									</Button>
								</Tooltip>
							) : undefined}
							{isPublished ? (
								<Tooltip label={"小説の公開を停止できます"} placement="top">
									<Button
										colorScheme={"red"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={stopPublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										{"公開を停止"}
									</Button>
								</Tooltip>
							) : (
								<Tooltip
									label={
										publishedDrafts.length === 0 ? "公開設定済みの小説がありません" : "公開設定済みの小説を公開できます"
									}
									placement="top"
								>
									<Button
										colorScheme={"teal"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={onPublishedNovel}
										isDisabled={publishedDrafts.length === 0 || userPenName === "Ghost Writer"}
										margin={2}
									>
										{"小説を投稿"}
									</Button>
								</Tooltip>
							)}

							<Text>{isPublished ? `最終公開日時：${timeStamp}` : timeStamp}</Text>
						</Box>
					)}
				</Box>
			) : undefined}
		</>
	);
});
ProfileArea.displayName = "ProfileArea";
