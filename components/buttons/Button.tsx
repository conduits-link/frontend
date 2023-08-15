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
		<div className={styles.container}>
			<button className={styles.element + " " + className} onClick={onClick}>
				{children}
			</button>
		</div>
	);
}
