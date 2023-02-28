import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { HeaderFooterLayout } from "../components/templates/HeaderFooterLayout";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const SiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAOTCHA_KEY;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<RecoilRoot>
				<HeaderFooterLayout>
					<GoogleReCaptchaProvider reCaptchaKey={SiteKey} language="ja">
						<Component {...pageProps} />
					</GoogleReCaptchaProvider>
				</HeaderFooterLayout>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
