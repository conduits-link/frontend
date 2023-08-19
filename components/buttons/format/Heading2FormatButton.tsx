import { Editor } from "@tiptap/react";

import { GoHeading } from "react-icons/go";

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
			<GoHeading />
			<sub>2</sub>
		</FormatButton>
	);
}
