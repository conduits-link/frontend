import React, { ReactNode } from "react";
import { Lato } from "next/font/google";

import "./globals.css";

export const metadata = {
	title: "Noteworthy",
	description: "The power of LLMs brought to an interface.",
};

const font = Lato({
	weight: ["400", "700", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	);
}
