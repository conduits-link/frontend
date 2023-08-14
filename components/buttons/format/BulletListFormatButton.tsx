import { BiListUl } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function BulletListStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("bulletList") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleBulletList().run()}
			>
				<BiListUl />
			</StyleButton>
		</div>
	);
}
