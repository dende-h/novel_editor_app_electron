import { extendTheme, StyleFunctionProps, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
	sm: "520px",
	md: "768px",
	lg: "1000px",
	xl: "1280px",
	xxl: "1600px"
});

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false
};

const theme = extendTheme({
	config,
	colors: {
		black: "#16161D"
	},
	fonts: {
		heading: `'Raleway', sans-serif`,
		body: `'Open Sans', sans-serif`
	},
	breakpoints,
	global: (props: StyleFunctionProps) => ({
		body: {
			color: mode("gray.750", "gray.100")(props),
			bg: mode("gray.200", "gray.800")(props),
			fonts: "Open Sans"
		}
	})
	// styles: {
	// 	global: {
	// 		body: {
	// 			backgroundColor: "gray.200",
	// 			color: "gray.750",
	// 			fonts: "Open Sans"
	// 		},
	// 		heading: {
	// 			backgroundColor: "gray.200",
	// 			color: "gray.750",
	// 			fonts:
	// 		}
	// 	}
	// }
});

export default theme;
