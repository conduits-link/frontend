import React from "react";

import { EditorInterface, ListUnorderedElement } from "@/utils/editor/slate";
import { Editor } from "slate";

import RootNode from "./Root";

const ListOrdered = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: ListUnorderedElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<ul>{elements}</ul>
		</RootNode>
	);
};

export default ListOrdered;
