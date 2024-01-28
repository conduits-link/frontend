import Modal from "@/components/wrappers/Modal";
import { useState } from "react";

const UrlModal = ({
	title,
	text,
	setUrlValue,
	onClose,
	children,
}: {
	title: string;
	text: string;
	setUrlValue: (url: string) => void;
	onClose: any;
	children: React.ReactNode;
}) => {
	const [inputValue, setInputValue] = useState("");

	return (
		<Modal
			title={title}
			text={text}
			onSubmit={() => {
				setUrlValue(inputValue);
			}}
			onClose={onClose}
		>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
		</Modal>
	);
};

export default UrlModal;
