import { useState } from "react";

import { TbAtom } from "react-icons/tb";

import Button from "../buttons/Button";

import styles from "./DocumentBlock.module.css";

export default function DocumentBlock({
	children,
}: {
	children: React.ReactNode;
}) {
	const [showLeftToolbar, setShowLeftToolbar] = useState(false);

	return (
		<div
			className={styles.container}
			onMouseEnter={() => setShowLeftToolbar(true)}
			onMouseLeave={() => setShowLeftToolbar(false)}
		>
			<div className={styles.element}>
				{showLeftToolbar && (
					<div className={styles.containerToolbarLeft}>
						<Button
							className={styles.buttonPrompt}
							onClick={() => {}}
						>
							<TbAtom />
						</Button>
					</div>
				)}
				<div className={styles.node}>{children}</div>
			</div>
		</div>
	);
}
