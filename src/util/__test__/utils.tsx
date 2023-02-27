/* eslint @typescript-eslint/no-explicit-any :0*/
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import React from "react";

/**
 * ChakraRender is a custom renderer, used to wrap the provided
 * ui element with the Chakra UI Provider before rendering.
 *
 * @param ui {JSX.Element} The given ReactDOM element to render
 * @param options {any} The optional options passed to the render function
 *
 * @returns {ReactTestRenderer} The rendered React test renderer
 */
const ChakraRender = (ui: JSX.Element, options?: any) => {
	return render(<ChakraProvider>{ui}</ChakraProvider>, ...options);
};

export * from "@testing-library/react";
export { ChakraRender as render };
