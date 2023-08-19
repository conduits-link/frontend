import { Editor } from "@tiptap/react";

import { GoLink } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function LinkFormatButton({
	editor,
	className,
}: {
	editor: Editor;
	className: string;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("link") ? "is-active" : "")
			}
			onClick={() =>
				editor
					.chain()
					.focus()
					.toggleLink({
						href: window.prompt("URL") || "",
						_blank: true,
					} as { href: string; _blank: boolean })
					.run()
			}
		>
			<GoLink />
		</FormatButton>
	);
}
