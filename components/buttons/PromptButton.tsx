import { ReactNode } from "react";

import sendFetch, { ApiResponse } from "../../utils/fetch";
import Button from "./Button";

import styles from "./PromptButton.module.css";

export default function PromptButton({
	prompt,
	handleRequest,
	handleResponse,
	children,
}: {
	prompt: string;
	handleRequest: () => string;
	handleResponse: (response: ApiResponse) => void;
	children: ReactNode;
}) {
	function infer(e: React.MouseEvent) {
		const input: string = handleRequest();

		sendFetch("/api", "POST", "", { prompt, input }).then((res) =>
			handleResponse(res as ApiResponse)
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
