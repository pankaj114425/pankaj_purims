import "./resume.css"

import { IBM_Plex_Serif, Noto_Sans, Noto_Serif } from "next/font/google";

const fontSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-sans",
});

const fontSerif = IBM_Plex_Serif({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-serif",
});

export const metadata = {
	title: "PU Research Framework",
	description: "PU Research Framework",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={fontSerif.variable}>
				{children}
			</body>
		</html>
	);
}
