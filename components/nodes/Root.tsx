import React from "react";

import styles from "./Root.module.css";

const RootNode = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<div contentEditable={false}>
					<button>hello there</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default RootNode;
