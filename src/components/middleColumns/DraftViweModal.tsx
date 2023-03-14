import {
	Box,
	Button,
	Center,
	Divider,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useDisclosure,
	VStack,
	Text,
	Tooltip
} from "@chakra-ui/react";
import { FC } from "react";

import { draftObject } from "../../globalState/selector/editorState";

export const DraftViweModal: FC<Pick<draftObject, "title" | "body">> = ({ title, body }) => {
	const titleBgColor = useColorModeValue(
		"linear(to-r,gray.100,gray.200,gray.300,gray.200,gray.100)",
		"linear(to-r,gray.500,gray.600,gray.700,gray.600,gray.500)"
	);
	const dividerColor = useColorModeValue("white", "black");
	const bookCoverColor = useColorModeValue(
		"linear(to-r, green.500,green.600,green.700 ,green.700, green.700,green.600,green.500)",
		"linear(to-r, green.400,green.500,green.600 ,green.600, green.600,green.500,green.400)"
	);
	const css = { "writing-mode": "vertical-rl", "text-orientation": "upright" };
	const backgroundColor = useColorModeValue("gray.200", "gray.600");

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Tooltip hasArrow label={title} placement={"top-start"}>
				<Center
					w={"40px"}
					h={"180px"}
					p={1}
					position="relative"
					borderTopColor={"green.500"}
					borderTopWidth={"1px"}
					borderRightColor={"green.700"}
					borderRightWidth={"1px"}
					borderLeftColor={"green.700"}
					borderLeftWidth={"1px"}
					borderBottomColor={"green.800"}
					borderBottomWidth={"2px"}
					borderTopRadius={"3px"}
					borderBottomRadius={"2px"}
					opacity={0.9}
					_hover={{ opacity: 1, shadow: "dark-lg", cursor: "pointer" }}
					bgGradient={bookCoverColor}
					onClick={onOpen}
				>
					<VStack w={"100%"} h={"100%"}>
						<Divider borderWidth={"2px"} borderColor={dividerColor} position={"absolute"} top={1} w={"34px"} />
						<Divider borderWidth={"2px"} borderColor={dividerColor} position={"absolute"} top={1} w={"34px"} />
						<Heading
							position={"absolute"}
							sx={css}
							fontFamily={"Noto Serif JP"}
							overflow={"hidden"}
							textOverflow={"ellipsis"}
							whiteSpace={"nowrap"}
							size="ms"
							paddingX={"3px"}
							paddingY={"3px"}
							bgGradient={titleBgColor}
							borderWidth={"1px"}
							borderRadius={"1px"}
							h={"80%"}
							w={"65%"}
							top={6}
						>
							{title}
						</Heading>
					</VStack>
				</Center>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size="full">
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} textAlign="right" position={"relative"}>
					<ModalHeader textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} fontFamily={"Noto Serif JP"}>
						{title}
					</ModalHeader>
					<ModalCloseButton position={"absolute"} top={1} left={1} />
					<ModalBody>
						<Box overflowX={"scroll"} textAlign={"right"} display="inline-block" w={"1fr"}>
							<Text sx={css} fontFamily={"Noto Serif JP"} textIndent={"1em"} display="inline-block" textAlign={"left"}>
								{body}
							</Text>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={"teal"} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
