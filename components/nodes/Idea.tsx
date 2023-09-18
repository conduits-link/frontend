import React from "react";

import { Editor, Node, Path, Transforms } from "slate";

import {
	TbColumnInsertLeft,
	TbColumnInsertRight,
	TbReload,
	TbReplace,
	TbRotateClockwise,
	TbRowInsertBottom,
	TbRowInsertTop,
	TbTrashX,
} from "react-icons/tb";

import styles from "./Idea.module.css";
import { ReactEditor } from "slate-react";

const Idea = (props: any) => {
	const { editor, node } = props;

	const getParentIndex = () => ReactEditor.findPath(editor, node)[0];
	const getPath = () => ReactEditor.findPath(editor, node);

	const getNewNode = () => {
		return {
			type: "paragraph",
			children: [
				{
					type: "text",
					children: [{ text: Node.string(node) }],
				},
			],
		};
	};

	const prependNode = () => {
		remove();

		Transforms.insertNodes(editor, getNewNode(), { at: [getParentIndex()] });
	};

	const appendNode = () => {
		remove();

		Transforms.insertNodes(editor, getNewNode(), {
			at: [getParentIndex() + 1],
		});
	};

	const replace = () => {
		remove();

		const content = Node.string(node);
		const path = [getParentIndex(), 0, 0];

		Transforms.delete(editor, { at: path });
		Transforms.insertText(editor, content, { at: path });
	};

	const prependText = () => {
		remove();

		const content = Node.string(node).concat(
			" ",
			Node.string(Editor.node(editor, [getParentIndex(), 0])[0])
		);
		const path = [getParentIndex(), 0, 0];

		Transforms.delete(editor, { at: path });
		Transforms.insertText(editor, content, { at: path });
	};

	const appendText = () => {
		remove();

		const content = Node.string(
			Editor.node(editor, [getParentIndex(), 0])[0]
		).concat(" ", Node.string(node));
		const path = [getParentIndex(), 0, 0];

		Transforms.delete(editor, { at: path });
		Transforms.insertText(editor, content, { at: path });
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
				<button disabled={true}>
					<TbReload />
				</button>
				<button disabled={true}>
					<TbRotateClockwise />
				</button>
				<button onClick={replace}>
					<TbReplace />
				</button>
				<button onClick={prependNode}>
					<TbRowInsertTop />
				</button>
				<button onClick={prependText}>
					<TbColumnInsertLeft />
				</button>
				<button onClick={appendText}>
					<TbColumnInsertRight />
				</button>
				<button onClick={appendNode}>
					<TbRowInsertBottom />
				</button>
				<button onClick={remove}>
					<TbTrashX />
				</button>
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
