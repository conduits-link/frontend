import { Editor } from "@tiptap/react";

import { GoTasklist } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function TaskListFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("taskList") ? "is-active" : "")
			}
			onClick={() => editor.chain().focus().toggleTaskList().run()}
		>
			<GoTasklist />
		</FormatButton>
	);
}
