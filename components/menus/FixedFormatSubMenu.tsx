import React, { useState } from "react";

import styles from "./FixedFormatSubMenu.module.css";

export default function FixedFormatSubMenu({
	children,
}: {
	children: React.ReactElement[];
}) {
	const [menuActive, setMenuActive] = useState(false);

	const newActiveButton = (child: React.ReactNode) =>
		React.cloneElement(child as React.ReactElement, {
			onMouseOver: () => {
				setMenuActive(true);
			},
			onMouseLeave: () => {
				setMenuActive(false);
			},
		});

	const [activeButton, setActiveButton] = useState(
		newActiveButton(children[0])
	);

	const newChildren = children.map((child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child as React.ReactElement, {
				onClick: () => {
					setActiveButton(newActiveButton(child));
					setMenuActive(false);
				},
			});
		}
		return child;
	});

	return (
		<div className={styles.container}>
			<div className={styles.elementFixed}>{activeButton}</div>
			{menuActive && (
				<div
					className={styles.elementFloating}
					onMouseEnter={() => setMenuActive(true)}
					onMouseLeave={() => setMenuActive(false)}
				>
					{newChildren.filter((button) => button.key !== activeButton.key)}
				</div>
			)}
		</div>
	);
}
