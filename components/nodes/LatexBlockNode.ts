import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import LatexBlock from "./LatexBlock";

const LatexBlockNode = Node.create({
	name: "latexBlock",
	inline: true,
	content: "inline*",
	group: "inline",
	parseHTML() {
		return [
			{
				tag: "latex-block",
			},
		];
	},
	renderHTML({ HTMLAttributes }) {
		return ["latex-block", mergeAttributes(HTMLAttributes)];
	},
	addNodeView() {
		return ReactNodeViewRenderer(LatexBlock);
	},
});

export default LatexBlockNode;
