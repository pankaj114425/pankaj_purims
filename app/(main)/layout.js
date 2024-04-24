import Header from "@/components/Header/Header";
import "./globals.css";
import "./variables.css";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

const fontSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-sans",
});

const fontSerif = Noto_Serif({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
			<body className={"dark " + fontSans.variable + " " + fontSerif.variable}>
				<SessionProvider>
					{/* basePath="/api/auth" refetchInterval={5*60} refetchOnWindowFocus={true} */}
					<Header />
					{children}
					<Footer />
					<Analytics />
				</SessionProvider>
			</body>
		</html>
	);
}
