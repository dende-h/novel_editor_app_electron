import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { HeaderFooterLayout } from "../components/templates/HeaderFooterLayout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<RecoilRoot>
				<HeaderFooterLayout>
					<Component {...pageProps} />
				</HeaderFooterLayout>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
