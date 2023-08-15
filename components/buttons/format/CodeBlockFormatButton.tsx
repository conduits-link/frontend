import { BiCodeBlock } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function CodeBlockFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("codeBlock") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				<BiCodeBlock />
			</FormatButton>
		</div>
	);
}
