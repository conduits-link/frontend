import React from "react";

import { EditorInterface, ListOrderedElement } from "@/utils/editor/slate";
import { Editor } from "slate";

import RootNode from "./Root";

const ListOrdered = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: ListOrderedElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<ol>{elements}</ol>
		</RootNode>
	);
};

export default ListOrdered;
