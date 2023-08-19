import { ReactNode } from "react";

import Button from "./Button";

export default function FormatButton({
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
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			{children}
		</Button>
	);
}
