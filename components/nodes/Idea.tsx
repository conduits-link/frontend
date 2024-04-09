import React from "react";

import { Editor } from "slate";

import styles from "./Idea.module.css";

const Idea = ({
	editor,
	// node,
	key,
	children,
}: {
	editor: Editor;
	// node: Node;
	key: string;
	children: React.ReactNode;
}) => {
	// const getParentIndex = () => ReactEditor.findPath(editor, node)[0];
	// const getPath = () => ReactEditor.findPath(editor, node);

	// const replaceParentNodeTextWithApiResponse = async (input: string) => {
	// 	const path = getPath();
	// 	path.push(0);

	// 	Transforms.delete(editor, { at: path });

	// 	const promptName: string = (
	// 		Editor.node(editor, getPath())[0] as { promptName?: string }
	// 	)?.promptName!;

	// 	const content = constructPrompt(
	// 		input,
	// 		prompts.find((prompt) => prompt.name == promptName)!.prompt
	// 	);

	// 	const res = (await sendFetch(
	// 		`${process.env.NEXT_PUBLIC_API_URL}/generate/text`,
	// 		"POST",
	// 		"",
	// 		{
	// 			promptName,
	// 			messages: [
	// 				{
	// 					role: "user",
	// 					content,
	// 				},
	// 			],
	// 		}
	// 	)) as apiResponse;

	// 	const body = (res.data as apiPrompt).messages[0].content;
	// 	Transforms.insertText(editor, body, { at: path });
	// };

	// const setParentNodeText = (content: string) => {
	// 	removeThisNode();

	// 	const path = [getParentIndex(), 0, 0];

	// 	Transforms.insertText(editor, content, { at: path });
	// };

	// const insertNode = (path: number[]) => {
	// 	removeThisNode();

	// 	const newNode = {
	// 		type: "paragraph",
	// 		children: [
	// 			{
	// 				type: "text",
	// 				children: [{ text: Node.string(node) }],
	// 			},
	// 		],
	// 	};

	// 	// TODO: make type more robust
	// 	Transforms.insertNodes(editor, newNode as unknown as Node, { at: path });
	// };

	// const removeThisNode = () => {
	// 	const ideaContainer = Editor.node(editor, [getParentIndex(), 1])[0];
	// 	const empty =
	// 		(ideaContainer as { children?: any[] }).children?.length == 1;

	// 	if (empty) Transforms.delete(editor, { at: [getParentIndex(), 1] });
	// 	else Transforms.delete(editor, { at: getPath() });
	// };

	// const retryWithNodeContent = () => {
	// 	const input = Node.string(Editor.node(editor, [getParentIndex(), 0])[0]);
	// 	replaceParentNodeTextWithApiResponse(input);
	// };

	// const retryWithIdeaContent = () => {
	// 	const input = Node.string(Editor.node(editor, getPath())[0]);
	// 	replaceParentNodeTextWithApiResponse(input);
	// };

	// const prependNode = () => {
	// 	insertNode([getParentIndex()]);
	// };

	// const appendNode = () => {
	// 	insertNode([getParentIndex() + 1]);
	// };

	// const replace = () => {
	// 	setParentNodeText(Node.string(node));
	// };

	// const prependText = () => {
	// 	const parentNodeContent = Node.string(
	// 		Editor.node(editor, [getParentIndex(), 0])[0]
	// 	);
	// 	const content = Node.string(node).concat(" ", parentNodeContent);
	// 	setParentNodeText(content);
	// };

	// const appendText = () => {
	// 	const parentNodeContent = Node.string(
	// 		Editor.node(editor, [getParentIndex(), 0])[0]
	// 	);
	// 	const content = parentNodeContent.concat(" ", Node.string(node));
	// 	setParentNodeText(content);
	// };

	return (
		<div className={styles.container}>
			{/* <div className={styles.containerButtons} contentEditable={false}>
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
				<button className={styles.buttonAction} onClick={replace}>
					<TbReplace />
				</button>
				<button className={styles.buttonAction} onClick={prependNode}>
					<TbRowInsertTop />
				</button>
				<button className={styles.buttonAction} onClick={prependText}>
					<TbColumnInsertLeft />
				</button>
				<button className={styles.buttonAction} onClick={appendText}>
					<TbColumnInsertRight />
				</button>
				<button className={styles.buttonAction} onClick={appendNode}>
					<TbRowInsertBottom />
				</button>
				<button className={styles.buttonAction} onClick={removeThisNode}>
					<TbTrashX />
				</button>
			</div> */}
			<div className={styles.element} key={key}>
				{children}
			</div>
		</div>
	);
};

export default Idea;
