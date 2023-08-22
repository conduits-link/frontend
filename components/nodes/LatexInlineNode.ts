import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import LatexInline from "./LatexInline";

export default Node.create({
	name: "latexInline",
	inline: true,
	content: "inline*",
	group: "inline",
	parseHTML() {
		return [
			{
				tag: "latex-inline",
			},
		];
	},
	renderHTML({ HTMLAttributes }) {
		return ["latex-inline", mergeAttributes(HTMLAttributes)];
	},
	addNodeView() {
		return ReactNodeViewRenderer(LatexInline);
	},
});
