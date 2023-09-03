import { useState } from "react";

import { Node } from "@tiptap/pm/model";

import { TbAtom } from "react-icons/tb";

import { useEditorContext } from "../Context";
import prompts, { Prompt } from "@/utils/prompts";

import PromptButton from "../buttons/PromptButton";

import styles from "./DocumentBlock.module.css";

export default function DocumentBlock({
	node,
	children,
}: {
	node: Node;
	children: React.ReactNode;
}) {
	// const { content, setContent } = useEditorContext();

	const [showLeftToolbar, setShowLeftToolbar] = useState(false);
	const [showPromptMenu, setShowPromptMenu] = useState(false);
	const [activePrompts, setActivePrompts] = useState<Prompt[]>(prompts);

	if (node.attrs.answers) console.log(node.attrs.answers.length);

	return (
		<div
			className={styles.container}
			onMouseEnter={() => {
				if (!showPromptMenu) setShowLeftToolbar(true);
			}}
			onMouseLeave={() => {
				if (!showPromptMenu) setShowLeftToolbar(false);
			}}
		>
			<div className={styles.element}>
				<div className={styles.containerNode}>
					{showLeftToolbar && (
						<div className={styles.containerToolbarLeft}>
							<button
								className={styles.promptMenuButton}
								onClick={() => setShowPromptMenu(!showPromptMenu)}
							>
								<TbAtom />
							</button>
							{showPromptMenu && (
								<div className={styles.promptButtonContainer}>
									{activePrompts &&
										activePrompts.map((prompt: Prompt, i: number) => {
											return (
												<PromptButton
													handleResponse={() => {}}
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
				<div className={styles.promptResponseContainer}>
					{node.attrs.answers &&
						node.attrs.answers.map((answer: string) => {
							return <p contentEditable={true}>{answer}</p>;
						})}
				</div>
			</div>
		</div>
	);
}
