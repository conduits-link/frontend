import { BiCodeAlt } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function CodeStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("code") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleCode().run()}
			>
				<BiCodeAlt />
			</StyleButton>
		</div>
	);
}
