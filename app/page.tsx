"use client";

import styles from "./page.module.css";

import {
	useEditor,
	EditorContent,
	BubbleMenu,
	FloatingMenu,
} from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export default function MyEditor() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				emptyEditorClass: "is-editor-empty",
				placeholder: "Start typing...",
			}),
		],
		content: "",
	});

	return (
		<div className={styles.container}>
			{editor && (
				<>
					<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<button
							onClick={() => editor.chain().focus().toggleBold().run()}
							className={editor.isActive("bold") ? "is-active" : ""}
						>
							bold
						</button>
						<button
							onClick={() => editor.chain().focus().toggleItalic().run()}
							className={editor.isActive("italic") ? "is-active" : ""}
						>
							italic
						</button>
						<button
							onClick={() => editor.chain().focus().toggleStrike().run()}
							className={editor.isActive("strike") ? "is-active" : ""}
						>
							strike
						</button>
						<button>custom!</button>
					</BubbleMenu>
					<FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<button
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 1 }).run()
							}
							className={
								editor.isActive("heading", { level: 1 })
									? "is-active"
									: ""
							}
						>
							h1
						</button>
						<button
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
							className={
								editor.isActive("heading", { level: 2 })
									? "is-active"
									: ""
							}
						>
							h2
						</button>
						<button
							onClick={() =>
								editor.chain().focus().toggleBulletList().run()
							}
							className={
								editor.isActive("bulletList") ? "is-active" : ""
							}
						>
							bullet list
						</button>
					</FloatingMenu>
				</>
			)}
			<EditorContent className={styles.page} editor={editor} />
		</div>
	);
}
