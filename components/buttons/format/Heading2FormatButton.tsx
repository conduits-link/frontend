import { Editor } from "@tiptap/react";

import { BiHeading } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function Heading2FormatButton({
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
				(editor.isActive("heading", { level: 2 }) ? "is-active" : "")
			}
			onClick={() =>
				editor.chain().focus().toggleHeading({ level: 2 }).run()
			}
		>
			<BiHeading />
			<sub>2</sub>
		</FormatButton>
	);
}
