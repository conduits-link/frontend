import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";

import styles from "./Latex.module.css";

export default function LatexBlock({ node }: { node: Node }) {
	return (
		<NodeViewWrapper className={styles.containerBlock}>
			<TeX math={node.textContent} />
		</NodeViewWrapper>
	);
}
