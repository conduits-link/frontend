import { Editor } from "@tiptap/react";

import { GoNumber } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function LatexFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton className={className} onClick={() => {}}>
			<GoNumber />
		</FormatButton>
	);
}
