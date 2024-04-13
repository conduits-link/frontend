import React from "react";

import RootNode from "./Root";
import { Editor } from "slate";
import { CodeblockElement, EditorInterface } from "@/utils/editor/slate";

const Codeblock = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: CodeblockElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<pre>{elements}</pre>
		</RootNode>
	);
};

export default Codeblock;
