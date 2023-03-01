import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

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
	fonts: {
		heading: `'Raleway', sans-serif`,
		body: `'Open Sans', sans-serif`
	},
	breakpoints,
	styles: {
		global: {
			body: {
				backgroundColor: "gray.200",
				color: "gray.750",
				fonts: "Open Sans"
			},
			heading: {
				backgroundColor: "gray.200",
				color: "gray.750",
				fonts: "Raleway"
			}
		}
	}
});

export default theme;
