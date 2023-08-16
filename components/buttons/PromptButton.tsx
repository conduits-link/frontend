import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";
import Button from "./Button";

export default function PromptButton({
	prompt,
	children,
}: {
	prompt: string;
	children: ReactNode;
}) {
	function infer() {
		const input: string = window.getSelection()!.toString();

		sendFetch("/api", "POST", "", { prompt, input }).then((res) =>
			console.log(res)
		);
	}

	return (
		<Button className={""} onClick={infer}>
			{children}
		</Button>
	);
}
