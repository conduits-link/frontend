import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";
import Button from "./Button";

interface ApiResponse {
	answer: string;
}

export default function PromptButton({
	prompt,
	handleResponse,
	children,
}: {
	prompt: string;
	handleResponse: (response: string) => void;
	children: ReactNode;
}) {
	function infer() {
		const input: string = window.getSelection()!.toString();

		sendFetch("/api", "POST", "", { prompt, input }).then((res) =>
			handleResponse((res as ApiResponse).answer)
		);
	}

	return <button onClick={infer}>{children}</button>;
}
