"use client";

import { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";

import { parseLatex } from "@/utils/parse";
import { extensions } from "@/utils/editor";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import FloatingFormatMenu from "@/components/menus/FloatingFormatMenu";

import styles from "./page.module.css";

export default function Editor() {
	const [mode, setMode] = useState<string>("edit");
	const [content, setContent] = useState<string>(`
      <h1>The Impact of Technology on Modern Education</h1>
      <h2>Introduction</h2>
      <p>In the 21st century, technology has revolutionized every aspect of our lives, and education is no exception. The integration of technology in modern education has brought about significant changes in the way we learn, teach, and interact with information. This essay explores the profound impact of technology on education and its implications for both students and educators.</p>
   `);
	const [editableContent, setEditableContent] = useState<string>();

	function switchMode(newMode: string) {
		switch (newMode) {
			case "edit":
				setContent(editableContent!);
				break;
			case "preview":
				setEditableContent(content);
				setContent(parseLatex(content));
				break;
			default:
		}

		setMode(newMode);
	}

	const editor = useEditor(
		{
			extensions,
			content,
			editable: mode !== "preview",
			onUpdate: ({ editor }) => setContent(editor.getHTML()),
		},
		[mode]
	);

	if (editor === null) return;

	return (
		<div className={styles.container}>
			<NavigationMenu
				mode={mode}
				switchMode={switchMode}
			/>
			<FloatingFormatMenu editor={editor} />
			<EditorContent
				className={styles.page}
				editor={editor}
				onChange={(e) => console.log(e)}
			/>
			{mode !== "preview" && <FixedFormatMenu editor={editor} />}
		</div>
	);
}
