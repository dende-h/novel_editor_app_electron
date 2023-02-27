import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: "520px",
	md: "768px",
	lg: "1000px",
	xl: "1280px",
	xxl: "1600px"
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
				backgroundColor: "gray.200",
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
