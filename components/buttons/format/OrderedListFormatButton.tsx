import { Editor } from "@tiptap/react";

import { GoListOrdered } from "react-icons/go";

import FormatButton from "../FormatButton";

export default function OrderedListFormatButton({
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
				(editor.isActive("orderedList") ? "is-active" : "")
			}
			onClick={(e) => {
				if (onClick) onClick(e);
				editor.chain().focus().toggleOrderedList().run();
			}}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<GoListOrdered />
		</FormatButton>
	);
}
