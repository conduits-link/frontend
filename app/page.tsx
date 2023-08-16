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
		content: `  <h1>The Impact of Technology on Modern Education</h1>
                  
                  <h2>Introduction</h2>
                  <p>In the 21st century, technology has revolutionized every aspect of our lives, and education is no exception. The integration of technology in modern education has brought about significant changes in the way we learn, teach, and interact with information. This essay explores the profound impact of technology on education and its implications for both students and educators.</p>

                  <h3>Accessibility of Information</h3>
                  <p>One of the most noticeable effects of technology on education is the accessibility of information. With the advent of the internet, students now have access to a vast repository of knowledge at their fingertips. Online resources, e-books, and educational websites have made it possible for learners to explore subjects beyond the confines of traditional textbooks. This democratization of information empowers students to delve into areas of interest, fostering a culture of self-directed learning.</p>

                  <h2>Transformation of the Classroom</h2>
                  <p>Furthermore, technology has transformed the classroom itself. Interactive smart boards, multimedia presentations, and educational apps have made lessons more engaging and dynamic. Traditional chalk-and-talk methods are being supplemented with visually appealing content that caters to different learning styles. This shift has not only increased student participation but has also allowed educators to personalize their teaching, catering to individual needs and learning paces.</p>

                  <h2>Global Collaborative Learning</h2>
                  <p>Collaborative learning has also been greatly enhanced by technology. Virtual classrooms and video conferencing tools enable students from different parts of the world to collaborate on projects, share ideas, and engage in discussions. This globalization of education prepares students for an interconnected world and exposes them to diverse perspectives, thereby promoting cultural awareness and empathy.</p>

                  <h2>Challenges and Concerns</h2>
                  <p>However, the integration of technology in education also raises concerns. The digital divide, characterized by unequal access to technology, threatens to exacerbate educational inequalities. Students from underprivileged backgrounds may not have the same access to online resources, potentially deepening existing disparities in academic achievement.</p>

                  <p>Moreover, the ease of accessing information online has led to challenges related to misinformation and plagiarism. It is crucial for educators to teach students critical thinking skills and ethical use of technology, ensuring that they can discern reliable sources from unreliable ones and properly attribute their work.</p>

                  <h2>Conclusion</h2>
                  <p>In conclusion, the impact of technology on modern education is undeniable. It has reshaped learning environments, expanded access to knowledge, and facilitated global collaboration. While technology presents opportunities for enhanced learning experiences, it also requires careful navigation to address potential drawbacks. Educators and policymakers must work together to ensure that technology is harnessed in a way that maximizes its benefits while minimizing its limitations, ultimately paving the way for a more innovative and inclusive educational landscape.</p>
               `,
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
