import { useRef, useState } from "react";

import { Editor, BubbleMenu } from "@tiptap/react";

import prompts, { Prompt } from "@/utils/prompts";

import PromptButton from "../buttons/PromptButton";

import styles from "./PromptMenu.module.css";

export default function PromptMenu({ editor }: { editor: Editor }) {
	const promptSearch = useRef<HTMLInputElement>(null);
	const [activePrompts, setActivePrompts] = useState<Prompt[]>(prompts);

	function onSearch(e: React.FormEvent<HTMLInputElement>): void {
		const term: string = e.currentTarget.value.toLowerCase();

		const filteredPrompts = prompts.filter((prompt) =>
			prompt.name.toLowerCase().includes(term)
		);

		setActivePrompts(filteredPrompts);
	}

	return (
		<BubbleMenu
			className={styles.container}
			editor={editor}
			tippyOptions={{
				duration: 100,
				onMount: () => {
					promptSearch.current!.value = "";
					// promptSearch.current!.focus();
					setActivePrompts(prompts);
				},
			}}
		>
			<input type="text" ref={promptSearch} onInput={onSearch}></input>
			{activePrompts &&
				activePrompts.map((prompt: Prompt, i: number) => {
					return (
						<PromptButton prompt={prompt.prompt} key={prompt.name}>
							{prompt.name}
						</PromptButton>
					);
				})}
		</BubbleMenu>
	);
}
