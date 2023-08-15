import { BiCodeAlt } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function CodeFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("code") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleCode().run()}
			>
				<BiCodeAlt />
			</FormatButton>
		</div>
	);
}
