"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import FlashMessage from "@/components/wrappers/FlashMessage";

interface FlashMessageContextProps {
	children: ReactNode;
}

interface FlashMessage {
	type: "success" | "error" | "info";
	text: string;
}

interface FlashMessageContextType {
	showFlashMessage: (type: FlashMessage["type"], text: string) => void;
}

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(
	undefined
);

export const FlashMessageProvider: React.FC<FlashMessageContextProps> = ({
	children,
}) => {
	const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

	const showFlashMessage = (type: FlashMessage["type"], text: string) => {
		setFlashMessage({ type, text });
		setTimeout(() => {
			setFlashMessage(null);
		}, 5500); // 5050 is the length of time the flash message displays for (inside FlashMessage.tsx) plus the animation duration (inside FlashMessage.module.css) plus a buffer
	};

	return (
		<FlashMessageContext.Provider value={{ showFlashMessage }}>
			{flashMessage && (
				<div
					style={{
						width: "100vw",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<FlashMessage
						type={flashMessage!.type}
						message={flashMessage!.text}
					/>
				</div>
			)}
			{children}
		</FlashMessageContext.Provider>
	);
};

export const useFlashMessage = () => {
	const context = useContext(FlashMessageContext);
	if (!context) {
		throw new Error(
			"useFlashMessage must be used within a FlashMessageProvider"
		);
	}
	return context;
};
