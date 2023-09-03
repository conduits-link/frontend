import { ReactNodeViewRenderer } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";

import ParagraphOverride from "./Paragraph";

export default Paragraph.extend({
	addAttributes() {
		return {
			answers: { default: [] },
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer(ParagraphOverride);
	},
});
