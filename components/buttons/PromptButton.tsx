import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";
import Button from "./Button";

import styles from "./PromptButton.module.css";

interface ApiResponse {
	answer: string;
}

export default function PromptButton({
	prompt,
	onClick,
	handleResponse,
	children,
}: {
	prompt: string;
	onClick?: React.MouseEventHandler;
	handleResponse: (response: string) => void;
	children: ReactNode;
}) {
	function infer(e: React.MouseEvent) {
		if (onClick) onClick(e);

		sendFetch("/api", "POST", "", { prompt }).then((res) =>
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
