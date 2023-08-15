import { BiBold } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function BoldFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("bold") ? "is-active" : " " + className}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<BiBold />
			</FormatButton>
		</div>
	);
}
