import React from "react";

import styles from "./PromptResponse.module.css";

export default function PromptResponse({
	replace,
	children,
}: {
	replace: (content: string) => void;
	children: React.ReactNode;
}) {
	return (
		<div className={styles.container}>
			<button disabled={true}>Retry</button>
			<button disabled={true}>Retry (with edits)</button>
			<button disabled={true}>Prepend</button>
			<button onClick={() => replace("yoyoyoy")}>Replace</button>
			<button disabled={true}>Insert</button>
			<button disabled={true}>Append</button>
			<button disabled={true}>Remove</button>
			<p
				className={styles.element}
				contentEditable={true}
			>
				{children}
			</p>
		</div>
	);
}
