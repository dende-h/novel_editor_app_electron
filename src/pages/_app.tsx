import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme/theme";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
