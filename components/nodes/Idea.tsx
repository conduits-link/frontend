import React from "react";

import styles from "./Idea.module.css";

const Idea = (props: any) => {
	return (
		<div className={styles.container}>
			<div className={styles.containerButtons}>
				<button>Replace</button>
			</div>
			<div
				className={styles.element}
				key={props.key}
			>
				{props.children}
			</div>
		</div>
	);
};

export default Idea;
