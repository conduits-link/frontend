import React from "react";

import styles from "./Root.module.css";

const RootNode = ({
	children,
	...attributes
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.container}>
			<div contentEditable={false}>
				<button>hello there</button>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default RootNode;
