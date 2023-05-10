import Seo from "../components/util/Seo";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
	VStack,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Button,
	Box,
	FormErrorMessage
} from "@chakra-ui/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormValues = {
	name: string;
	email: string;
	message: string;
	googleReCaptchaToken: string;
};

export default function Contact() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({ mode: "onChange" });
	const { executeRecaptcha } = useGoogleReCaptcha();

	const onSubmit = handleSubmit(async (data) => {
		if (!executeRecaptcha) return;
		const token = await executeRecaptcha("submit");
		console.log(token);
		data.googleReCaptchaToken = token;

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		try {
			const response = await fetch("https://dende-h.form.newt.so/v1/OlfVLFc0t", {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json"
				}
			});

			if (response.ok) {
				router.push("/thanks");
			} else {
				router.push("/error");
			}
		} catch (err) {
			router.push("/error");
		}
	});
	return (
		<>
			<Seo
				pageTitle="問い合わせフォーム"
				pageDescription="管理人への問い合わせメールを送信できます"
				pagePath="https://next-novel-editor.vercel.app/contact"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box p="6" w="100%" h={"90vh"}>
				<VStack spacing="6">
					<Heading as="h1" size="xl">
						Contact Form
					</Heading>
					<form onSubmit={onSubmit}>
						<VStack align="stretch" spacing="4">
							<FormControl isInvalid={Boolean(errors.name)}>
								<FormLabel htmlFor="name" fontSize={{ base: "md", md: "lg" }}>
									Name
								</FormLabel>
								<Input
									id="name"
									placeholder="お名前"
									{...register("name", { required: "Name is required" })}
									aria-describedby="error-name-required"
									size="lg"
									variant="filled"
									shadow="md"
									_hover={{ shadow: "lg" }}
									_focus={{ outline: "none", shadow: "lg" }}
								/>
								{errors?.name && (
									<FormErrorMessage id="error-name-required" aria-live="assertive">
										{errors.name.message}
									</FormErrorMessage>
								)}
							</FormControl>
							<FormControl isInvalid={Boolean(errors.email)}>
								<FormLabel htmlFor="email" fontSize={{ base: "md", md: "lg" }}>
									Email
								</FormLabel>
								<Input
									id="email"
									placeholder="email"
									type="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Invalid email format"
										}
									})}
									size="lg"
									variant="filled"
									shadow="md"
									_hover={{ shadow: "lg" }}
									_focus={{ outline: "none", shadow: "lg" }}
								/>
								{errors?.email && (
									<FormErrorMessage id="error-email" aria-live="assertive">
										{errors.email.message}
									</FormErrorMessage>
								)}
							</FormControl>
							<FormControl w={{ base: "320px", md: "400px", lg: "550px" }}>
								<FormLabel htmlFor="message" fontSize={{ base: "md", md: "lg" }}>
									Message
								</FormLabel>
								<Textarea
									id="message"
									name="message"
									placeholder="お問い合わせ内容を入力してください"
									{...register("message")}
									size="lg"
									variant="filled"
									shadow="md"
									_hover={{ shadow: "lg" }}
									_focus={{ outline: "none", shadow: "lg" }}
									minH={"150px"}
								></Textarea>
							</FormControl>
							<Button
								type="submit"
								size="lg"
								colorScheme={"teal"}
								w={{ base: "100%", lg: "auto" }}
								alignSelf={{ base: "center", lg: "flex-end" }}
							>
								Submit
							</Button>
						</VStack>
					</form>
				</VStack>
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
