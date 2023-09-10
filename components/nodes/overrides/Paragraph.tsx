import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import DocumentBlock from "../menus/DocumentBlock";
import { useEffect, useState } from "react";

export default function Paragraph({ node }: { node: Node }) {
	const [c, setC] = useState(node.textContent);

	return (
		<NodeViewWrapper>
			<DocumentBlock
				node={node}
				c={c}
				setC={setC}
			>
				<p>{c}</p>
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
