import { BiListUl } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function BulletListFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("bulletList") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			>
				<BiListUl />
			</FormatButton>
		</div>
	);
}
