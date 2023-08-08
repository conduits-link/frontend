import React, { ReactNode } from "react";

import "./globals.css";
import { Lora } from "next/font/google";

const font = Lora({ subsets: ["latin"] });

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
