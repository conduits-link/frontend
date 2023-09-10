import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import DocumentBlock from "../menus/DocumentBlock";
import { useEffect } from "react";

export default function Paragraph({ node }: { node: Node }) {
	return (
		<NodeViewWrapper>
			<DocumentBlock node={node}>
				<p>
					<NodeViewContent />
				</p>
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
