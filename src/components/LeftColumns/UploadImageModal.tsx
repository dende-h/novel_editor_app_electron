import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useColorModeValue,
	Container,
	Box,
	Heading,
	Progress,
	Center
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { useToastTemplate } from "../../hooks/useToastTemplate";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";
import Dropzone, { FileWithPath } from "react-dropzone";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import { useDraft } from "../../hooks/useDraft";

//画像を追加するためのフォームモーダル
export const UploadImageModal = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const displayDraft = useRecoilValue(editorState);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const toast = useToastTemplate();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const { onAddImage, onRemoveImage } = useDraft();

	const uploadFile = async (fileName: string, fileExt: string, fileData: ArrayBuffer) => {
		const { data, error } = await supabase.storage
			.from("images")
			.upload(`images/novelThumbnail/${fileName}`, fileData, {
				cacheControl: "public, max-age=31536000", // optional cache control
				upsert: false, // optional upsert flag (if updating existing file)
				contentType: `image/${fileExt}` // optional content type
			});
		if (error) {
			toast.praimaryErrorToast(error.message);
			return Promise.reject(error);
		}
	};

	const removeFile = async (fileName: string) => {
		const { error } = await supabase.storage.from("images").remove([`images/novelThumbnail/${fileName}`]);
		if (error) {
			toast.praimaryErrorToast(error.message);
			return Promise.reject(error);
		}
	};

	const getPublicUrl = async (fileName: string) => {
		const url = supabase.storage.from("images").getPublicUrl(`images/novelThumbnail/${fileName}`);
		return url;
	};

	const handleUpload = async (file: FileWithPath) => {
		try {
			const fileName = file.name;
			const fileExt = fileName.split(".").pop();
			const fileData = await file.arrayBuffer();
			await uploadFile(fileName, fileExt, fileData);
			setUploading(true);
			setUploadProgress(0);

			try {
				const publicUrl = (await getPublicUrl(fileName)).data.publicUrl;
				onAddImage(publicUrl, fileName);
				setUploading(false);
				setUploadProgress(0);
			} catch (error) {
				await removeFile(fileName);
				onRemoveImage();
			}
		} catch (error) {
			setUploading(false);
			setUploadProgress(0);
		}
	};

	const handleRemove = async () => {
		const fileName = displayDraft.imageName;

		removeFile(fileName);

		onRemoveImage();
	};

	const handleDrop = (acceptedFiles: FileWithPath[]) => {
		if (acceptedFiles.length > 0) {
			handleUpload(acceptedFiles[0]);
		}
	};

	return (
		<>
			<Box>
				<PrimaryIconButton
					icon={<RiImageAddFill />}
					colorScheme={"facebook"}
					aria-label="imageUpload"
					focusOutline="none"
					onClick={(e) => {
						onOpen();
						e.stopPropagation(); //親要素へのバブリングを停止
					}}
				/>
				<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
					<ModalOverlay />
					<ModalContent backgroundColor={backgroundColor}>
						<ModalHeader>サムネイル画像の追加</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							{displayDraft?.isImageUpload ? (
								<Center>
									<Box
										w="200px"
										h="282px"
										display="flex"
										justifyContent="center"
										alignItems="center"
										position={"relative"}
									>
										<Image
											src={displayDraft?.imageUrl}
											alt="image description"
											object-fit="contain"
											width={200}
											height={282}
										/>
									</Box>
								</Center>
							) : (
								<Container maxW="md" py={10}>
									<Dropzone onDrop={handleDrop} multiple={false}>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border="2px"
												borderColor="gray.300"
												borderRadius="md"
												py={20}
												textAlign="center"
												cursor="pointer"
												bg={uploading ? "gray.100" : "white"}
											>
												{uploading ? (
													<>
														<Progress value={uploadProgress} size="sm" mb={4} />
														Uploading...
													</>
												) : (
													<>
														<input {...getInputProps()} />
														<Heading size="md">Drag and Drop an Image</Heading>
														<Box mt={4}>
															<Button size="sm">Choose File</Button>
														</Box>
													</>
												)}
											</Box>
										)}
									</Dropzone>
								</Container>
							)}
						</ModalBody>
						<ModalFooter>
							{displayDraft?.isImageUpload && (
								<Button onClick={handleRemove} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
									Remove
								</Button>
							)}
							<Button onClick={onClose} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
});
UploadImageModal.displayName = "UploadImageModal";
