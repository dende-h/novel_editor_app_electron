import { Footer } from "../footers/Footer";
import { Header } from "../headers/Header";

export const HeaderFooterLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};
