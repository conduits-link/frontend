import { ReactNodeViewRenderer } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";

import ParagraphOverride from "./Paragraph";

interface CustomNodeAttrs {
	answers: string[]; // Define the type for the 'answers' attribute
	// Other custom attributes if you have them
}

export default Paragraph.extend<CustomNodeAttrs>({
	addAttributes() {
		return {
			answers: { default: [] },
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer(ParagraphOverride);
	},
	// Use the 'preserveAttrs' method to ensure 'answers' remains an array
	preserveAttrs: (attrs: CustomNodeAttrs) => ({
		...attrs,
		answers: [...attrs.answers], // Create a shallow copy of the 'answers' array
	}),
});
