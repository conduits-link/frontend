import { Editor } from "@tiptap/react";

import { GoStrikethrough } from "react-icons/go";

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
			<GoStrikethrough />
		</FormatButton>
	);
}
