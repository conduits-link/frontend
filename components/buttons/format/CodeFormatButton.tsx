import { Editor } from "@tiptap/react";

import { GoCode } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function CodeFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("code") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleCode().run()}
		>
			<GoCode />
		</FormatButton>
	);
}
