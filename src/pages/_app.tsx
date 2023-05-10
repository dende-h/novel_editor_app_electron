import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { HeaderFooterLayout } from "../components/templates/HeaderFooterLayout";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import theme from "../theme/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { IsClient } from "../components/util/IsClient";
import { Global } from "@emotion/react";
import GoogleAnalytics from "../components/util/GoogleAnalytics";
import usePageView from "../hooks/usePageView";
import { Analytics } from "@vercel/analytics/react";

const SiteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAOTCHA_KEY;

function MyApp({ Component, pageProps }: AppProps) {
	usePageView();
	return (
		<ChakraProvider resetCSS={true} theme={theme}>
			<Global
				styles={`
          ::-webkit-scrollbar {
            width: 3px;
             background-color: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: gray;
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #a1a1a1;
          }
          ::-webkit-scrollbar-corner {
            background-color: #f5f5f5;
          }
        `}
			/>
			<RecoilRoot>
				<HeaderFooterLayout>
					<GoogleReCaptchaProvider reCaptchaKey={SiteKey} language="ja">
						<IsClient />
						<GoogleAnalytics />
						<Analytics />
						<Component {...pageProps} />
					</GoogleReCaptchaProvider>
				</HeaderFooterLayout>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
