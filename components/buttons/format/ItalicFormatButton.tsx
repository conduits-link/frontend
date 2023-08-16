import { Editor } from "@tiptap/react";

import { BiItalic } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function ItalicFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("italic") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleItalic().run()}
		>
			<BiItalic />
		</FormatButton>
	);
}
