import { Editor } from "@tiptap/react";

import { BiHeading } from "react-icons/bi";

import FormatButton from "../FormatButton";

export default function Heading1FormatButton({
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
				(editor.isActive("heading", { level: 1 }) ? "is-active" : "")
			}
			onClick={() =>
				editor.chain().focus().toggleHeading({ level: 1 }).run()
			}
		>
			<BiHeading />
			<sub>1</sub>
		</FormatButton>
	);
}
