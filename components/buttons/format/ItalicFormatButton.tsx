import { BiItalic } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function ItalicStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("italic") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleItalic().run()}
			>
				<BiItalic />
			</StyleButton>
		</div>
	);
}
