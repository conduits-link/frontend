import { Editor } from "@tiptap/react";

import { BiHeading } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function Heading3FormatButton({
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
				(editor.isActive("heading", { level: 3 }) ? "is-active" : "")
			}
			onClick={() =>
				editor.chain().focus().toggleHeading({ level: 3 }).run()
			}
		>
			<BiHeading />
			<sub>3</sub>
		</FormatButton>
	);
}
