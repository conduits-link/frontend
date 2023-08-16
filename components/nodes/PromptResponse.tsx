import React from "react";

import { Node } from "@tiptap/pm/model";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

import styles from "./PromptResponse.module.css";

export default function PromptResponse({ node }: { node: Node }) {
	return (
		<NodeViewWrapper className={styles.container}>
			<NodeViewContent />
		</NodeViewWrapper>
	);
}
