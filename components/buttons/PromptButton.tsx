import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";
import Button from "./Button";

import styles from "./PromptButton.module.css";

interface ApiResponse {
	answer: string;
}

export default function PromptButton({
	prompt,
	input,
	onClick,
	handleResponse,
	children,
}: {
	prompt: string;
	input: string;
	onClick?: React.MouseEventHandler;
	handleResponse: (response: string) => void;
	children: ReactNode;
}) {
	function infer(e: React.MouseEvent) {
		if (onClick) onClick(e);

		// const input: string = window.getSelection()!.toString();

		sendFetch("/api", "POST", "", { prompt, input }).then((res) =>
			handleResponse((res as ApiResponse).answer)
		);
	}

	return (
		<Button
			className={styles.element}
			onClick={infer}
		>
			{children}
		</Button>
	);
}
