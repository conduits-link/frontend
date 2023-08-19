import { Editor } from "@tiptap/react";

import { GoListOrdered } from "react-icons/go";

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
			<GoListOrdered />
		</FormatButton>
	);
}
