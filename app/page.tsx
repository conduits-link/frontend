"use client";

import { useEditor, EditorContent } from "@tiptap/react";
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

import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import PromptMenu from "@/components/menus/PromptMenu";
import FloatingFormatMenu from "@/components/menus/FloatingFormatMenu";

import styles from "./page.module.css";

import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import PromptResponse from "@/components/nodes/PromptResponse";

const PromptResponseNode = Node.create({
	name: "promptResponse",

	group: "block",

	content: "block*",

	addAttributes() {
		return {
			count: {
				default: 0,
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "prompt-response",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["prompt-response", mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return ReactNodeViewRenderer(PromptResponse);
	},
});

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
			PromptResponseNode,
		],
		content: `<prompt-response>hithere</prompt-response>`,
	});

	return (
		<>
			{editor && (
				<>
					<div className={styles.container}>
						<FixedFormatMenu editor={editor} />
						<PromptMenu editor={editor} />
						<FloatingFormatMenu editor={editor} />
						<EditorContent className={styles.page} editor={editor} />
					</div>
				</>
			)}
		</>
	);
}
