import React, { useRef, useState } from "react";

import { Node } from "@tiptap/pm/model";

import { TbAtom } from "react-icons/tb";

import { useEditorContext } from "../../Context";
import prompts, { Prompt } from "@/utils/prompts";

import PromptButton from "../../buttons/PromptButton";
import PromptResponse from "./PromptResponse";

import styles from "./DocumentBlock.module.css";
import { get } from "http";

export default function DocumentBlock({
	node,
	setC,
	children,
}: {
	node: Node;
	setC: React.Dispatch<React.SetStateAction<string>>;
	children: React.ReactNode;
}) {
	const { content, setContent } = useEditorContext();

	const containerRef: React.RefObject<HTMLDivElement> = useRef(null);
	const [showLeftToolbar, setShowLeftToolbar] = useState(false);
	const [showPromptMenu, setShowPromptMenu] = useState(false);
	const [activePrompts, setActivePrompts] = useState<Prompt[]>(prompts);
	const [promptResponses, setPromptResponses] = useState<string[]>([]);

	function handlePromptRequest(e: React.MouseEvent) {
		setShowPromptMenu(false);
	}

	function handlePromptResponse(answer: string) {
		setPromptResponses([...promptResponses, answer]);
	}

	const getContainerClasses = () => {
		let classes = styles.container;

		if (promptResponses.length > 0) classes += ` ${styles.editing}`;

		return classes;
	};

	function getChildIndex(element: HTMLDivElement) {
		const nodeParent = element.parentElement!.parentElement;
		const nodeParentContainer = nodeParent!.parentElement;
		const childrenArray = Array.from(nodeParentContainer!.children);
		return childrenArray.indexOf(nodeParent!);
	}

	function splitHtmlElements(htmlString: string): string[] {
		const regex = /(<[^>]+>[^<]*<\/[^>]+>|<[^>]+>)/g;
		const elements = htmlString.match(regex) || [];

		return elements;
	}

	function replaceHtml(html: string, newNode: string, index: number) {
		const elements = splitHtmlElements(html);
		elements[index] = newNode;
		return elements.join("");
	}

	function replace(newContent: string) {
		// var index = getChildIndex(containerRef.current!);
		// setContent(replaceHtml(content, newContent, index));

		setC(newContent);
		setPromptResponses(
			promptResponses.filter((response) => response !== newContent)
		);
	}

	return (
		<div
			className={getContainerClasses()}
			onMouseEnter={() => {
				if (!showPromptMenu) setShowLeftToolbar(true);
			}}
			onMouseLeave={() => {
				if (!showPromptMenu) setShowLeftToolbar(false);
			}}
			ref={containerRef}
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
													prompt={prompt.prompt}
													onClick={handlePromptRequest}
													handleResponse={handlePromptResponse}
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
					{promptResponses &&
						promptResponses.map((answer: string) => {
							return (
								<PromptResponse replace={replace}>
									{answer}
								</PromptResponse>
							);
						})}
				</div>
			</div>
		</div>
	);
}
