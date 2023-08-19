import { Editor } from "@tiptap/react";

import { GoBold } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function BoldFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("bold") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleBold().run()}
		>
			<GoBold />
		</FormatButton>
	);
}
