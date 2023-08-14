import { BiCodeBlock } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function CodeBlockStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("codeBlock") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<BiCodeBlock />
			</StyleButton>
		</div>
	);
}
