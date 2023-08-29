import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Node } from "@tiptap/pm/model";

import DocumentBlock from "../DocumentBlock";

export default function Heading({ node }: { node: Node }) {
	return (
		<NodeViewWrapper>
			<DocumentBlock>
				{(() => {
					switch (node.attrs.level) {
						case 1:
							return (
								<h1>
									<NodeViewContent />
								</h1>
							);
						case 2:
							return (
								<h2>
									<NodeViewContent />
								</h2>
							);
						case 3:
							return (
								<h3>
									<NodeViewContent />
								</h3>
							);
					}
				})()}
			</DocumentBlock>
		</NodeViewWrapper>
	);
}
