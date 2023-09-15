import React from "react";

import { Editor, Node, Path, Transforms } from "slate";

import styles from "./Idea.module.css";
import { ReactEditor } from "slate-react";

const Idea = (props: any) => {
	const { editor, node } = props;

	const getParentIndex = () => ReactEditor.findPath(editor, node)[0];
	const getPath = () => ReactEditor.findPath(editor, node);

	const replace = () => {
		const content = Node.string(node);
		const path = [getParentIndex(), 0, 0];

		Transforms.delete(editor, { at: path });
		Transforms.insertText(editor, content, { at: path });

		remove();
	};

	const remove = () => {
		const ideaContainer = Editor.node(editor, [getParentIndex(), 1])[0];
		const empty = ideaContainer.children.length == 1;

		if (empty) Transforms.delete(editor, { at: [getParentIndex(), 1] });
		else Transforms.delete(editor, { at: getPath() });
	};

	return (
		<div className={styles.container}>
			<div className={styles.containerButtons}>
				<button>Retry</button>
				<button>Retry with edits</button>
				<button>Prepend</button>
				<button onClick={replace}>Replace</button>
				<button>Insert</button>
				<button>Append</button>
				<button onClick={remove}>Remove</button>
			</div>
			<div
				className={styles.element}
				key={props.key}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Idea;
