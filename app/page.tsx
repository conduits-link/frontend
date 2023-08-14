"use client";

import {
	useEditor,
	EditorContent,
	BubbleMenu,
	FloatingMenu,
} from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

import Heading1FormatButton from "@/components/buttons/format/Heading1FormatButton";
import Heading2FormatButton from "@/components/buttons/format/Heading2FormatButton";
import Heading3FormatButton from "@/components/buttons/format/Heading3FormatButton";
import OrderedListFormatButton from "@/components/buttons/format/OrderedListFormatButton";
import BulletListFormatButton from "@/components/buttons/format/BulletListFormatButton";
import CodeBlockFormatButton from "@/components/buttons/format/CodeBlockFormatButton";
import BoldFormatButton from "@/components/buttons/format/BoldFormatButton";
import ItalicFormatButton from "@/components/buttons/format/ItalicFormatButton";
import StrikeFormatButton from "@/components/buttons/format/_StrikeFormatButton";
import CodeFormatButton from "@/components/buttons/format/CodeFormatButton";

import styles from "./page.module.css";

export default function Editor() {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			CodeBlockLowLight.configure({
				lowlight,
				languageClassPrefix: "language-",
				defaultLanguage: "plaintext",
			}),
			BulletList.configure({
				keepMarks: true,
				keepAttributes: true,
			}),
			OrderedList.configure({
				keepMarks: true,
				keepAttributes: true,
			}),
			Placeholder.configure({
				emptyEditorClass: "is-editor-empty",
				placeholder: "Start typing...",
			}),
		],
		content: ``,
	});

	return (
		<div className={styles.container}>
			{editor && (
				<>
					<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<Heading1FormatButton editor={editor} />
						<Heading2FormatButton editor={editor} />
						<Heading3FormatButton editor={editor} />
						<BulletListFormatButton editor={editor} />
						<OrderedListFormatButton editor={editor} />
						<CodeBlockFormatButton editor={editor} />
						<BoldFormatButton editor={editor} />
						<ItalicFormatButton editor={editor} />
						<StrikeFormatButton editor={editor} />
						<CodeFormatButton editor={editor} />
					</BubbleMenu>
					<FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<Heading1FormatButton editor={editor} />
						<Heading2FormatButton editor={editor} />
						<Heading3FormatButton editor={editor} />
						<BulletListFormatButton editor={editor} />
						<OrderedListFormatButton editor={editor} />
						<CodeBlockFormatButton editor={editor} />
					</FloatingMenu>
				</>
			)}
			<EditorContent className={styles.page} editor={editor} />
		</div>
	);
}
