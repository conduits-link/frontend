import FlashMessage from "@/components/wrappers/FlashMessage";
import { createContext, ReactNode, useContext, useState } from "react";

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
	};

	return (
		<FlashMessageContext.Provider value={{ showFlashMessage }}>
			{flashMessage && (
				<FlashMessage
					type={flashMessage!.type}
					message={flashMessage!.text}
				/>
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
