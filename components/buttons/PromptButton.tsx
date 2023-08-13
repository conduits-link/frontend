import { ReactNode } from "react";

import sendFetch from "../../utils/fetch";

export default function PromptButton({
	settings,
	prompt,
	children,
}: {
	settings: string;
	prompt: string;
	children: ReactNode;
}) {
	function infer() {
		sendFetch("/api", "POST", "", { settings, prompt }).then((res) =>
			console.log(res)
		);
	}

	return (
		<div>
			<button onClick={infer}>{children}</button>
		</div>
	);
}
