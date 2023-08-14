import { BiBold } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function BoldStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("bold") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleBold().run()}
			>
				<BiBold />
			</StyleButton>
		</div>
	);
}
