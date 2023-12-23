import { EventHandler, ReactNode } from "react";

import { Editor, Node, Transforms, select } from "slate";

import { CustomEditor } from "@/utils/editor";

import Button from "./Button";

export default function FormatButton({
	editor,
	isNode,
	type,
	options,
	className,
	onClick,
	onMouseEnter,
	onMouseOver,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	onFocus,
	onBlur,
	children,
}: {
	editor: Editor;
	isNode: Boolean;
	type: string;
	options?: any;
	className: string;
	onClick?: React.MouseEventHandler;
	onMouseEnter?: React.MouseEventHandler;
	onMouseOver?: React.MouseEventHandler;
	onMouseDown?: React.MouseEventHandler;
	onMouseUp?: React.MouseEventHandler;
	onMouseLeave?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
	children: ReactNode;
}) {
	return (
		<Button
			className={className}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={(e) => {
				e.preventDefault();

				if (isNode)
					CustomEditor.toggleNodeType(type, editor, undefined, options);
				else CustomEditor.toggleMark(editor, type);

				if (onMouseDown) onMouseDown(e);
			}}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			{children}
		</Button>
	);
}
