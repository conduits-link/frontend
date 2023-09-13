import React, { EventHandler, MouseEventHandler } from "react";

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
		const newSubItem = {
			type: "sub-item",
			children: [{ text: "Sub item " }],
		};

		if (Node.children(node, [getPath()]).length > 1) {
			console.log("more than one child");
		} else {
			console.log("only one child");
		}

		// const nestPath: number[] = [getPath(), 1];
		// const items = editor.children[nestPath[0]].children[nestPath[1]].children;

		// Transforms.insertNodes(editor, newSubItem, {
		// 	at: nestPath.concat([items.length]),
		// });
	};

	const handleRequest = () => {
		setShowPromptMenu(false);
		return Node.get(node, [getPath(), 0]).text;
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
