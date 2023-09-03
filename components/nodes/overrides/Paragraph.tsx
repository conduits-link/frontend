import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import DocumentBlock from "../DocumentBlock";
import { useEffect } from "react";

export default function Paragraph({
	node,
	updateAttributes,
}: {
	node: Node;
	updateAttributes: any; // TODO: type
}) {
	const updatePromptResponses = () => {
		updateAttributes({
			promptResponses: node.attrs.answers.push("test"),
		});
	};

	useEffect(() => {
		// node.attrs.answers = Array.isArray(node.attrs.answers)
		// 	? node.attrs.answers
		// 	: node.attrs.answers.split(",");
	}, []);

	return (
		<NodeViewWrapper>
			<DocumentBlock node={node}>
				<p onClick={updatePromptResponses}>
					<NodeViewContent />
				</p>
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
