import { BiStrikethrough } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function StrikeFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("strike") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				<BiStrikethrough />
			</FormatButton>
		</div>
	);
}
