"use client";

import { useEffect } from "react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.bubble.css";

import sendFetch from "../utils/fetch";

import styles from "./page.module.css";

export default function Landing() {
	const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();

		let prompt: string | undefined = window.getSelection()?.toString();

		sendFetch("/api", "POST", "", { prompt }).then((res) => console.log(res));
	};

	const { Quill, quill, quillRef } = useQuill({
		theme: "bubble",
		modules: {
			toolbar: "#toolbar",
			magicUrl: true,
		},
		formats: ["bold", "italic", "strike", "list", "header", "clean"],
		placeholder: "Compose an epic...",
	});

	if (Quill && !quill) {
		const MagicUrl = require("quill-magic-url").default;
		Quill.register("modules/magicUrl", MagicUrl);
	}

	return (
		<main className={styles.container}>
			<div className={styles.page}>
				<div ref={quillRef} />

				<div id="toolbar">
					<select className="ql-header">
						<option value="title" />
						<option selected />
						<option value="h2" />
						<option value="huge" />
					</select>
					<button className="ql-bold" />
					<button className="ql-italic" />
					<button className="ql-strike" />
					<button className="ql-list" />
					<button className="ql-header" />
					<button className="ql-clean" />
					<div>frick</div>
				</div>
				<div id="editor" />
			</div>
		</main>
	);
}
