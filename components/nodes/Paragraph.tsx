import React from "react";
import { Editor } from "slate";

import { ParagraphElement } from "@/utils/editor/slate";

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
	const childrenArray = React.Children.toArray(children);

	return (
		<RootNode ideas={node.ideas} editor={editor} node={node} mode={mode}>
			<p>{childrenArray[0]}</p>
		</RootNode>
	);
};

export default Paragraph;
