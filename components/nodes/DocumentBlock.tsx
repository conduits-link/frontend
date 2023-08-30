import { useState } from "react";

import { TbAtom } from "react-icons/tb";

import prompts, { Prompt } from "@/utils/prompts";

import PromptButton from "../buttons/PromptButton";

import styles from "./DocumentBlock.module.css";

export default function DocumentBlock({
	children,
}: {
	children: React.ReactNode;
}) {
	const [showLeftToolbar, setShowLeftToolbar] = useState(false);
	const [showPromptMenu, setShowPromptMenu] = useState(false);
	const [activePrompts, setActivePrompts] = useState<Prompt[]>(prompts);
	const [promptResponses, setPromptResponses] = useState<string[]>([]);

	function addPromptResponse(response: string) {
		setPromptResponses((prev) => [...prev, response]);
	}

	return (
		<div
			className={styles.container}
			onMouseEnter={() => setShowLeftToolbar(true)}
			onMouseLeave={() => setShowLeftToolbar(false)}
		>
			<div className={styles.element}>
				{showLeftToolbar && (
					<div
						className={styles.containerToolbarLeft}
						onMouseEnter={() => setShowPromptMenu(true)}
						onMouseLeave={() => setShowPromptMenu(false)}
					>
						<TbAtom />
						{showPromptMenu && (
							<div className={styles.promptButtonContainer}>
								{activePrompts &&
									activePrompts.map((prompt: Prompt, i: number) => {
										return (
											<PromptButton
												handleResponse={addPromptResponse}
												prompt={prompt.prompt}
												key={prompt.name}
											>
												{prompt.name}
											</PromptButton>
										);
									})}
							</div>
						)}
					</div>
				)}
				<div className={styles.node}>{children}</div>
			</div>
		</div>
	);
}
