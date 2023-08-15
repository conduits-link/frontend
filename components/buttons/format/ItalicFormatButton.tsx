import { BiItalic } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function ItalicFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("italic") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<BiItalic />
			</FormatButton>
		</div>
	);
}
