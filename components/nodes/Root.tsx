import React from "react";

import { Editor, Node, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { LuAtom } from "react-icons/lu";

import styles from "./Root.module.css";
import PromptMenu from "../menus/PromptMenu";

const RootNode = ({
	children,
	ideas,
	editor,
	node,
}: {
	children: React.ReactNode;
	ideas?: any;
	editor: Editor;
	node: Node;
}) => {
	const [showLeftToolbar, setShowLeftToolbar] = React.useState<boolean>(false);
	const [showPromptMenu, setShowPromptMenu] = React.useState<boolean>(false);

	const getPath = () => ReactEditor.findPath(editor, node)[0];

	const addIdea = (newIdea: string) => {
		const idea = {
			type: "idea",
			children: [{ text: newIdea }],
		};

		const container = {
			type: "idea-container",
			children: [idea],
		};

		if (Node.has(node, [1])) {
			// If there are already ideas, add the new idea to the end of the list
			Transforms.insertNodes(editor, idea, {
				at: [getPath(), 1, [...Node.children(node, [1])].length],
			});
		} else {
			// If there are no ideas, create the container and add the idea
			Transforms.insertNodes(editor, container, { at: [getPath(), 1] });
		}
	};

	const handleRequest = () => {
		setShowPromptMenu(false);
		return Node.get(node, [0]).text;
	};

	const handleResponse = (answer: string) => {
		addIdea(answer);
	};

	return (
		<div
			className={styles.container}
			onMouseEnter={() => setShowLeftToolbar(true)}
			onMouseLeave={() => {
				if (!showPromptMenu) setShowLeftToolbar(false);
			}}
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
				{ideas}
			</div>
		</div>
	);
};

export default RootNode;
