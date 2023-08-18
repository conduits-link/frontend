import React, { ReactNode } from "react";

import "./globals.css";
import { Lato } from "next/font/google";

const font = Lato({
	weight: ["400", "700", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Noteworthy",
	description: "The power of LLMs brought to an interface.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>{children}</body>
		</html>
	);
}
