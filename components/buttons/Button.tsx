import { ReactNode } from "react";

import styles from "./Button.module.css";

export default function Button({
	className,
	onClick,
	children,
}: {
	className: string;
	onClick: React.MouseEventHandler;
	children: ReactNode;
}) {
	return (
		<button className={className + " " + styles.element} onClick={onClick}>
			{children}
		</button>
	);
}
