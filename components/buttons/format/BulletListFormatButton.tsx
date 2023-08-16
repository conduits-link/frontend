import { Editor } from "@tiptap/react";

import { BiListUl } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function BulletListFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("bulletList") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleBulletList().run()}
		>
			<BiListUl />
		</FormatButton>
	);
}
