import React from "react";

import RootNode from "./Root";
import { Editor } from "slate";
import { BlockquoteElement, EditorInterface } from "@/utils/editor/slate";

const Blockquote = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: BlockquoteElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<blockquote>{elements}</blockquote>
		</RootNode>
	);
};

export default Blockquote;
