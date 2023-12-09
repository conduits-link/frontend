import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";
import Button from "./Button";

import styles from "./PromptButton.module.css";
import { constructPrompt } from "@/utils/prompts";

export default function PromptButton({
	promptName,
	prompt,
	handleRequest,
	handleResponse,
	children,
}: {
	promptName: string;
	prompt: string;
	handleRequest: () => string;
	handleResponse: (res: apiPrompt) => void;
	children: ReactNode;
}) {
	async function infer(e: React.MouseEvent) {
		const input: string = handleRequest();

		const content = constructPrompt(input, prompt);

		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_API_URL}/generate/text`,
			"POST",
			"",
			{
				promptName: promptName,
				messages: [
					{
						role: "user",
						content,
					},
				],
			}
		)) as apiResponse;

		handleResponse(res.data as apiPrompt);
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
