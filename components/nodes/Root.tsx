import React, { EventHandler, MouseEventHandler } from "react";

import { Editor, Node, Path, Range, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import styles from "./Root.module.css";

const RootNode = ({
	children,
	editor,
	node,
}: {
	children: React.ReactNode;
	editor: Editor;
	node: Node;
}) => {
	const addSubItem = (e: MouseEventHandler) => {
		const path: number = ReactEditor.findPath(editor, node)[0];

		const newSubItem = {
			type: "sub-item",
			children: [{ text: "Sub item " }],
		};

		const nestPath: number[] = [path, 1];
		const items = editor.children[nestPath[0]].children[nestPath[1]].children;

		// Insert the new sub-item node at the end of the container's children
		Transforms.insertNodes(editor, newSubItem, {
			at: nestPath.concat([items.length]),
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<div contentEditable={false}>
					<button>hello there</button>
				</div>
				<div>{children}</div>
				<button onClick={addSubItem}>Add Sub-Item</button>
			</div>
		</div>
	);
};

export default RootNode;
