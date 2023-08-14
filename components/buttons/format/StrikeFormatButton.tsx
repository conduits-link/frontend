import { BiStrikethrough } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function StrikeStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("strike") ? "is-active" : ""}
				onClickRef={() =>
					editor.chain().focus().toggleStrike().run()
				}
			>
				<BiStrikethrough />
			</StyleButton>
		</div>
	);
}
