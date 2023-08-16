import { Editor } from "@tiptap/react";

import { BiStrikethrough } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function StrikeFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("strike") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleStrike().run()}
		>
			<BiStrikethrough />
		</FormatButton>
	);
}
