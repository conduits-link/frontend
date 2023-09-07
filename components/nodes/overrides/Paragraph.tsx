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
	return (
		<NodeViewWrapper>
			<DocumentBlock
				node={node}
				updateAttributes={updateAttributes}
			>
				<p>
					<NodeViewContent />
				</p>
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
