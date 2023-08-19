import { Editor } from "@tiptap/react";

import { GoHeading } from "react-icons/go";

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
			<GoHeading />
			<sub>3</sub>
		</FormatButton>
	);
}
