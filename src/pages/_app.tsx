import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@auth0/nextjs-auth0";
import theme from "../theme";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<RecoilRoot>
				<Toaster position="top-center" reverseOrder={false} />
				<UserProvider>
					<Component {...pageProps} />
				</UserProvider>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
