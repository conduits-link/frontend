import React, { useEffect } from "react";

import { Editor, Node, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { LuAtom } from "react-icons/lu";

import styles from "./Root.module.css";
import PromptMenu from "../menus/PromptMenu";
import { ApiResponse } from "@/utils/fetch";

const RootNode = ({
	children,
	ideas,
	editor,
	node,
	mode,
}: {
	children: React.ReactNode;
	ideas?: any;
	editor: Editor;
	node: Node;
	mode: string;
}) => {
	const [showLeftToolbar, setShowLeftToolbar] = React.useState<boolean>(false);
	const [showPromptMenu, setShowPromptMenu] = React.useState<boolean>(false);

	const mouseEnter = () => {
		if (mode == "edit") setShowLeftToolbar(true);
	};

	const mouseLeave = () => {
		if (mode == "edit" && !showPromptMenu) setShowLeftToolbar(false);
	};

	const getPath = () => ReactEditor.findPath(editor, node)[0];

	const addIdea = (res: ApiResponse) => {
		const idea = {
			type: "idea",
			children: [{ text: res.answer }],
			prompt: res.prompt,
		};

		const container = {
			type: "idea-container",
			children: [idea],
		};

		if (Node.has(node, [1])) {
			// If there are already ideas, add the new idea to the end of the list
			// TODO: make type more robust
			Transforms.insertNodes(editor, idea as unknown as Node, {
				at: [getPath(), 1, [...Node.children(node, [1])].length],
			});
		} else {
			// If there are no ideas, create the container and add the idea
			// TODO: make type more robust
			Transforms.insertNodes(editor, container as unknown as Node, {
				at: [getPath(), 1],
			});
		}
	};

	const handleRequest = () => {
		setShowPromptMenu(false);
		return Node.string(Editor.node(editor, [getPath(), 0])[0]);
	};

	const handleResponse = (res: ApiResponse): void => {
		addIdea(res);
	};

	const getContainerStyles = () => {
		if (mode == "edit" && ideas)
			return styles.container + " " + styles.containerIdeas;
		return styles.container;
	};

	useEffect(() => {
		setShowLeftToolbar(false);
		setShowPromptMenu(false);
	}, [mode]);

	return (
		<div
			className={getContainerStyles()}
			onMouseEnter={mouseEnter}
			onMouseLeave={mouseLeave}
		>
			<div className={styles.element}>
				<div className={styles.content}>
					{showLeftToolbar && (
						<div
							className={styles.contentToolbarLeft}
							contentEditable={false}
						>
							<button
								className={styles.button}
								onClick={() => setShowPromptMenu(!showPromptMenu)}
							>
								<LuAtom />
							</button>
							{showPromptMenu && (
								<PromptMenu
									className={styles.menuPrompt}
									handleRequest={handleRequest}
									handleResponse={handleResponse}
								/>
							)}
						</div>
					)}
					{children}
				</div>
				{mode == "edit" && ideas}
			</div>
		</div>
	);
};

export default RootNode;
