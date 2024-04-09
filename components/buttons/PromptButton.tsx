import { ReactNode } from "react";

import { constructPrompt } from "@/utils/prompts";
import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";

import Button from "./Button";

import styles from "./PromptButton.module.css";

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
	const { showFlashMessage } = useFlashMessage();

	async function infer(e: React.MouseEvent) {
		const input: string = handleRequest();
		const content = constructPrompt(input, prompt);

		const { response, body } = (await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/generate/text`,
				method: "POST",
				cookie: "",
				data: {
					prompt: {
						name: promptName,
						messages: [
							{
								role: "user",
								content,
							},
						],
					},
				},
			},
			showFlashMessage
		)) as apiResponse;

		handleResponse(body.prompt as apiPrompt);
	}

	return (
		<Button className={styles.element} onClick={infer}>
			{children}
		</Button>
	);
}
