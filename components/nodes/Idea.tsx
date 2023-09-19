import React from "react";

import { Editor, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import {
	TbColumnInsertLeft,
	TbColumnInsertRight,
	TbReload,
	TbReplace,
	TbRotateClockwise2,
	TbRowInsertBottom,
	TbRowInsertTop,
	TbTrashX,
} from "react-icons/tb";

import styles from "./Idea.module.css";
import sendFetch, { ApiResponse } from "@/utils/fetch";

const Idea = (props: any) => {
	const { editor, node } = props;

	const getParentIndex = () => ReactEditor.findPath(editor, node)[0];
	const getPath = () => ReactEditor.findPath(editor, node);

	const replaceParentNodeTextWithApiResponse = (input: string) => {
		const path = getPath();
		path.push(0);

		Transforms.delete(editor, { at: path });

		const prompt = Editor.node(editor, getPath())[0].prompt;

		sendFetch("/api", "POST", "", { prompt, input }).then((res) => {
			const content = (res as ApiResponse).answer;

			Transforms.insertText(editor, content, { at: path });
		});
	};

	const setParentNodeText = (content: string) => {
		removeThisNode();

		const path = [getParentIndex(), 0, 0];

		Transforms.insertText(editor, content, { at: path });
	};

	const insertNode = (path: number[]) => {
		removeThisNode();

		const newNode = {
			type: "paragraph",
			children: [
				{
					type: "text",
					children: [{ text: Node.string(node) }],
				},
			],
		};

		Transforms.insertNodes(editor, newNode, { at: path });
	};

	const removeThisNode = () => {
		const ideaContainer = Editor.node(editor, [getParentIndex(), 1])[0];
		const empty = ideaContainer.children.length == 1;

		if (empty) Transforms.delete(editor, { at: [getParentIndex(), 1] });
		else Transforms.delete(editor, { at: getPath() });
	};

	const retryWithNodeContent = () => {
		const input = Node.string(Editor.node(editor, [getParentIndex(), 0])[0]);
		replaceParentNodeTextWithApiResponse(input);
	};

	const retryWithIdeaContent = () => {
		const input = Node.string(Editor.node(editor, getPath())[0]);
		replaceParentNodeTextWithApiResponse(input);
	};

	const prependNode = () => {
		insertNode([getParentIndex()]);
	};

	const appendNode = () => {
		insertNode([getParentIndex() + 1]);
	};

	const replace = () => {
		setParentNodeText(Node.string(node));
	};

	const prependText = () => {
		const parentNodeContent = Node.string(
			Editor.node(editor, [getParentIndex(), 0])[0]
		);
		const content = Node.string(node).concat(" ", parentNodeContent);
		setParentNodeText(content);
	};

	const appendText = () => {
		const parentNodeContent = Node.string(
			Editor.node(editor, [getParentIndex(), 0])[0]
		);
		const content = parentNodeContent.concat(" ", Node.string(node));
		setParentNodeText(content);
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.containerButtons}
				contentEditable={false}
			>
				<button
					className={styles.buttonAction}
					onClick={retryWithNodeContent}
				>
					<TbReload />
				</button>
				<button
					className={styles.buttonAction}
					onClick={retryWithIdeaContent}
				>
					<TbRotateClockwise2 />
				</button>
				<button
					className={styles.buttonAction}
					onClick={replace}
				>
					<TbReplace />
				</button>
				<button
					className={styles.buttonAction}
					onClick={prependNode}
				>
					<TbRowInsertTop />
				</button>
				<button
					className={styles.buttonAction}
					onClick={prependText}
				>
					<TbColumnInsertLeft />
				</button>
				<button
					className={styles.buttonAction}
					onClick={appendText}
				>
					<TbColumnInsertRight />
				</button>
				<button
					className={styles.buttonAction}
					onClick={appendNode}
				>
					<TbRowInsertBottom />
				</button>
				<button
					className={styles.buttonAction}
					onClick={removeThisNode}
				>
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
