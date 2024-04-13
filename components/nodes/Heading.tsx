import React from "react";

import RootNode from "./Root";
import { Editor } from "slate";
import { EditorInterface, HeadingElement } from "@/utils/editor/slate";

const Heading = ({
	editor,
	node,
	children,
	mode,
}: {
	editor: Editor;
	node: HeadingElement;
	children: React.ReactNode;
	mode: string;
}) => {
	const { elements, ideas } =
		EditorInterface.splitChildrenIntoElementsAndIdeas(children, node);

	const getLevel = () => {
		switch (node.level) {
			case 1:
				return <h1>{elements}</h1>;
			case 2:
				return <h2>{elements}</h2>;
			case 3:
				return <h3>{elements}</h3>;
			default:
				return <h2>{elements}</h2>;
		}
	};

	return (
		<RootNode ideas={ideas} editor={editor} node={node} mode={mode}>
			{getLevel()}
		</RootNode>
	);
};

export default Heading;
