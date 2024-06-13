"use client";
import { useRouter } from "next/navigation";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";
import { Prompt } from "@/utils/prompts";

import styles from "./Prompts.module.css";
import { useState } from "react";

const Prompts = ({ prompts }: { prompts: Prompt[] }) => {
	const { showFlashMessage } = useFlashMessage();
	const router = useRouter();

	async function onSubmit() {
		const { response, body } = await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts`,
				method: "POST",
				cookie: "",
				data: {},
			},
			showFlashMessage
		);

		if (body.redirect_url) router.push(body.redirect_url);
	}

	return (
		<div className={styles.containerMain}>
			<h1>Prompts</h1>
			<div className={styles.containerPrompts}>
				{prompts.map((prompt) => {
					const [open, setOpen] = useState(false);

					return (
						<div key={prompt.uid} className={styles.prompt}>
							<div
								onClick={() => setOpen(!open)}
								className={styles.promptToggle}
							>
								<h2>{prompt.name}</h2>
							</div>
							{open && <textarea>{prompt.prompt}</textarea>}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Prompts;
