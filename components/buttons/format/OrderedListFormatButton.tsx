import { Editor } from "@tiptap/react";

import { BiListOl } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function OrderedListFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className +
				" " +
				(editor.isActive("orderedList") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleOrderedList().run()}
		>
			<BiListOl />
		</FormatButton>
	);
}
