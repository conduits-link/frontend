import { BiListOl } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function OrderedListFormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={editor.isActive("orderedList") ? "is-active" : ""}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<BiListOl />
			</FormatButton>
		</div>
	);
}
