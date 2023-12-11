import { ReactNode } from "react";

import styles from "./Button.module.css";

export default function Button({
	className,
	onClick,
	onMouseEnter,
	onMouseOver,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	onFocus,
	onBlur,
	disabled,
	children,
	primary,
}: {
	className?: string;
	type?: "button" | "submit" | "reset";
	onClick?: React.MouseEventHandler;
	onMouseEnter?: React.MouseEventHandler;
	onMouseOver?: React.MouseEventHandler;
	onMouseDown?: React.MouseEventHandler;
	onMouseUp?: React.MouseEventHandler;
	onMouseLeave?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
	disabled?: Boolean;
	children: ReactNode;
	primary?: Boolean;
}) {
	return (
		<button
			className={
				className +
				" " +
				styles.element +
				(primary ? " " + styles.primary : "") +
				(disabled ? " " + styles.disabled : "")
			}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
			disabled={!!disabled}
		>
			{children}
		</button>
	);
}
