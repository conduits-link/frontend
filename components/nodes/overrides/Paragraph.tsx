import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import DocumentBlock from "../DocumentBlock";

export default function Paragraph({ node }: { node: Node }) {
	return (
		<NodeViewWrapper>
			<DocumentBlock>
				<p>
					<NodeViewContent />
				</p>
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
