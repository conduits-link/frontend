import React from "react";

import styles from "./Idea.module.css";

const Idea = (props: any) => {
	return (
		<div
			className={styles.element}
			key={props.key}
		>
			{props.children}
		</div>
	);
};

export default Idea;
