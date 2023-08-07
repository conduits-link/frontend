"use client";

import sendFetch from "../lib/fetch";

import styles from "./page.module.css";

export default function Landing() {
	const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();

		let prompt: string | undefined = window.getSelection()?.toString();

		sendFetch("/api", "POST", undefined, { prompt }).then((res) =>
			console.log(res)
		);
	};

	return (
		<main className={styles.container}>
			<div
				className={styles.page}
				contentEditable={true}
				onContextMenu={handleContext}
			>
				edit me!
			</div>
		</main>
	);
}
