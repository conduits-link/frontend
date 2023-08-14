import { BiListOl } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function OrderedListStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("orderedList") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<BiListOl />
			</StyleButton>
		</div>
	);
}
