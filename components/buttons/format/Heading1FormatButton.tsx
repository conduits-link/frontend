import { Editor } from "@tiptap/react";

import { GoHeading } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function Heading1FormatButton({
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
				className +
				" " +
				(editor.isActive("heading", { level: 1 }) ? "is-active" : "")
			}
			onClick={(e) => {
				if (onClick) onClick(e);
				editor.chain().focus().toggleHeading({ level: 1 }).run();
			}}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<GoHeading />
			<sub>1</sub>
		</FormatButton>
	);
}
