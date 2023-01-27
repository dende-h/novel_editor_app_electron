import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em"
});

const theme = extendTheme({
	colors: {
		black: "#16161D"
	},
	fonts,
	breakpoints,
	styles: {
		global: {
			body: {
				backgroundColor: "gray.100",
				color: "gray.750",
				fonts: "メイリオ"
			}
		}
	},
	componets: {
		Divider: {
			colors: {
				brand: {
					100: "black",
					200: "white"
				}
			}
		}
	}
});

export default theme;
