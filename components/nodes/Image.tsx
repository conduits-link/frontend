import React from "react";

import RootNode from "./Root";
import { Editor } from "slate";
import { EditorInterface, ImageElement } from "@/utils/editor/slate";

const Image = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: ImageElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			<img src={node.url} alt={node.alt} style={{ width: "100%" }} />
		</RootNode>
	);
};

export default Image;
