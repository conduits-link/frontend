import React from "react";
import { Editor } from "slate";

import { EditorInterface, ParagraphElement } from "@/utils/editor/slate";

import RootNode from "./Root";

const Paragraph = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: ParagraphElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<p>{elements}</p>
		</RootNode>
	);
};

export default Paragraph;
