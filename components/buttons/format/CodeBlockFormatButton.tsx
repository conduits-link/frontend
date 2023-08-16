import { Editor } from "@tiptap/react";

import { BiCodeBlock } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function CodeBlockFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("codeBlock") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleCodeBlock().run()}
		>
			<BiCodeBlock />
		</FormatButton>
	);
}
