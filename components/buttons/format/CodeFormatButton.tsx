import { Editor } from "@tiptap/react";

import { GoCode } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function CodeFormatButton({
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
				className + " " + (editor.isActive("code") ? "is-active" : "")
			}
			onClick={(e) => {
				if (onClick) onClick(e);
				editor.chain().focus().toggleCode().run();
			}}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<GoCode />
		</FormatButton>
	);
}
