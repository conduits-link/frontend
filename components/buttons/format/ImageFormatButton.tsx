import { Editor } from "@tiptap/react";

import { GoImage } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function ImageFormatButton({
	editor,
	className,
	onClick,
	onMouseEnter,
	onMouseOver,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	onFocus,
	onBlur,
}: {
	editor: Editor;
	className: string;
	onClick?: React.MouseEventHandler;
	onMouseEnter?: React.MouseEventHandler;
	onMouseOver?: React.MouseEventHandler;
	onMouseDown?: React.MouseEventHandler;
	onMouseUp?: React.MouseEventHandler;
	onMouseLeave?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
}) {
	return (
		<FormatButton
			className={
				className + " " + (editor.isActive("image") ? "is-active" : "")
			}
			onClick={(e) => {
				if (onClick) onClick(e);
				editor
					.chain()
					.focus()
					.setImage({
						src: window.prompt("URL") || "",
					} as { src: string })
					.run();
			}}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<GoImage />
		</FormatButton>
	);
}
