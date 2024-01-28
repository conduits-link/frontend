import React, { ReactNode } from "react";
import { Lato } from "next/font/google";

import FlashMessageContainer from "@/components/wrappers/FlashMessageContainer";

import "./globals.css";
import { ModalProvider } from "@/contexts/modal";

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

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body className={font.className}>
				<FlashMessageContainer>
					<ModalProvider>{children}</ModalProvider>
				</FlashMessageContainer>
			</body>
		</html>
	);
};

export default RootLayout;
