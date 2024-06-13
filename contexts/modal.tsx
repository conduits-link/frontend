"use client";

import UrlModal from "@/components/menus/modals/UrlModal";
import Modal from "@/components/wrappers/Modal";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextProps {
	children: ReactNode;
}

interface Modal {
	type: "url";
	title: string;
	text: string;
	setValue: (url: string) => void;
}

interface ModalContextType {
	showModal: (
		type: Modal["type"],
		title: string,
		text: string,
		setValue: (url: string) => void
	) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
	const [modal, setModal] = useState<Modal | null>(null);

	const showModal = (
		type: Modal["type"],
		title: string,
		text: string,
		setValue: (url: string) => void
	) => {
		setModal({ type, title, text, setValue });
	};

	return (
		<ModalContext.Provider value={{ showModal }}>
			{modal && modal.type === "url" && (
				<UrlModal
					title={modal.title}
					text={modal.text}
					setUrlValue={modal.setValue}
					onClose={() => setModal(null)}
				>
					<input type="text" />
				</UrlModal>
			)}
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
