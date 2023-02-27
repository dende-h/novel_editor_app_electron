import Head from "next/head";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { VStack, Heading, FormControl, FormLabel, Input, Textarea, Button, Box } from "@chakra-ui/react";

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

	const onSubmit = handleSubmit(async (data) => {
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
			<Head>
				<title>NoA問い合わせフォーム</title>
				<meta name="description" content="NoAに関する問い合わせフォームです" />
			</Head>
			<Box>
				<VStack>
					<Heading as={"h1"}>Contact us</Heading>
					<form onSubmit={onSubmit}>
						<VStack>
							<FormControl isInvalid={Boolean(errors.name)}>
								<FormLabel htmlFor="name">Name</FormLabel>
								<Input
									id="name"
									{...register("name", { required: "Name is required" })}
									aria-describedby="error-name-required"
								/>
								{errors?.name && (
									<span id="error-name-required" aria-live="assertive">
										{errors.name.message}
									</span>
								)}
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input id="email" placeholder="email" type="email" {...register("email")} />
								<FormLabel htmlFor="message">Message</FormLabel>
								<Textarea id="message" name="message" {...register("message")}></Textarea>
							</FormControl>
							<Button type="submit">Submit</Button>
						</VStack>
					</form>
				</VStack>
			</Box>
		</>
	);
}
