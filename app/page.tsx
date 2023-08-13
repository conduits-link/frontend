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

import Heading1StyleButton from "@/components/buttons/style/Heading1StyleButton";
import Heading2StyleButton from "@/components/buttons/style/Heading2StyleButton";
import Heading3StyleButton from "@/components/buttons/style/Heading3StyleButton";
import OrderedListStyleButton from "@/components/buttons/style/OrderedListStyleButton";
import BulletListStyleButton from "@/components/buttons/style/BulletListStyleButton";
import CodeBlockStyleButton from "@/components/buttons/style/CodeBlockStyleButton";
import BoldStyleButton from "@/components/buttons/style/BoldStyleButton";
import ItalicStyleButton from "@/components/buttons/style/ItalicStyleButton";
import StrikethroughStyleButton from "@/components/buttons/style/StrikethroughStyleButton";
import CodeStyleButton from "@/components/buttons/style/CodeStyleButton";

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
						<Heading1StyleButton editor={editor} />
						<Heading2StyleButton editor={editor} />
						<Heading3StyleButton editor={editor} />
						<BulletListStyleButton editor={editor} />
						<OrderedListStyleButton editor={editor} />
						<CodeBlockStyleButton editor={editor} />
						<BoldStyleButton editor={editor} />
						<ItalicStyleButton editor={editor} />
						<StrikethroughStyleButton editor={editor} />
						<CodeStyleButton editor={editor} />
					</BubbleMenu>
					<FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
						<Heading1StyleButton editor={editor} />
						<Heading2StyleButton editor={editor} />
						<Heading3StyleButton editor={editor} />
						<BulletListStyleButton editor={editor} />
						<OrderedListStyleButton editor={editor} />
						<CodeBlockStyleButton editor={editor} />
					</FloatingMenu>
				</>
			)}
			<EditorContent className={styles.page} editor={editor} />
		</div>
	);
}
