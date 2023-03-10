import { IconButton, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { AiFillEdit, AiFillIdcard, AiFillMail } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { IoLibrarySharp } from "react-icons/io5";
import { HiLibrary } from "react-icons/hi";
import { useRouter } from "next/router";

export const LeftMenuBar = memo(() => {
	const router = useRouter();
	// eslint-disable-next-line react/jsx-key
	const menuIcons = [<AiFillEdit />, <AiFillIdcard />, <IoLibrarySharp />, <HiLibrary />, <ImBlog />, <AiFillMail />];

	const onClickMenu = (buttonIndex: number) => {
		switch (buttonIndex) {
			case 0:
				router.push("/"); //ホーム
				break;
			case 1:
				router.push("/profile"); //プロフィールページ
				break;
			case 2:
				router.push("drafts"); //一覧ページ
				break;
			case 3:
				router.push("/"); //
				break;
			case 4:
				router.push("/"); //
				break;
			case 5:
				router.push("/contact"); //問い合わせページ
				break;

			default:
				break;
		}
	};

	return (
		<>
			<VStack
				bgColor={"blackAlpha.800"}
				position={"relative"}
				zIndex={4}
				w={"55px"}
				h={"100%"}
				display={{ base: "none", lg: "block" }}
				textAlign={"center"}
				spacing={6}
				paddingY={8}
			>
				{menuIcons.map((item, index) => {
					return (
						<IconButton
							key={index}
							aria-label="menuList"
							icon={item}
							variant="ghost"
							colorScheme={"twitter"}
							fontSize="24px"
							boxSize={10}
							onClick={() => onClickMenu(index)}
						/>
					);
				})}
			</VStack>
		</>
	);
});

LeftMenuBar.displayName = "RightMenuBar";
