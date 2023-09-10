import { Extension, Mark, Node } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import ParagraphOverrideNode from "@/components/nodes/overrides/ParagraphOverride";
import HeadingOverride from "@/components/nodes/overrides/HeadingOverride";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

import LatexBlockNode from "@/components/nodes/LatexBlockNode";
import LatexInlineNode from "@/components/nodes/LatexInlineNode";

const extensions: (Node | Mark | Extension)[] = [
	Document,
	Placeholder.configure({
		emptyEditorClass: "is-editor-empty",
		placeholder: "Start typing...",
	}),
	Text,
	// Paragraph,
	ParagraphOverrideNode,
	HeadingOverride.configure({
		levels: [1, 2, 3],
	}),
	ListItem,
	BulletList.configure({
		keepMarks: true,
		keepAttributes: true,
	}),
	OrderedList.configure({
		keepMarks: true,
		keepAttributes: true,
	}),
	TaskList,
	TaskItem,
	Image,
	CodeBlockLowLight.configure({
		lowlight,
		languageClassPrefix: "language-",
		defaultLanguage: "plaintext",
	}),
	Table,
	TableRow,
	TableCell,
	TableHeader,
	Bold,
	Italic,
	Strike,
	Link,
	Code,
	LatexInlineNode,
	LatexBlockNode,
];

export { extensions };
