import { ReactNodeViewRenderer } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";

import HeadingOverride from "./Heading";

export default Heading.extend({
	addNodeView() {
		return ReactNodeViewRenderer(HeadingOverride);
	},
});

