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
      $$2x^2+x-1$$
      <h1>The Impact of Technology on Modern Education</h1>
      <h2>Introduction</h2>
      <p>In the 21st century, $2x^2+x-1$, technology has revolutionized every aspect of our lives, and education is no exception. The integration of technology in modern education has brought about significant changes in the way we learn, teach, and interact with information. This essay explores the profound impact of technology on education and its implications for both students and educators.</p>
      <table><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr><tr><td>Data 4</td><td>Data 5</td><td>Data 6</td></tr></tbody></table>
      <h3>Accessibility of Information</h3>
      <p>One of the most noticeable effects of technology on education is the accessibility of information. With the advent of the internet, students now have access to a vast repository of knowledge at their fingertips. Online resources, e-books, and educational websites have made it possible for learners to explore subjects beyond the confines of traditional textbooks. This democratization of information empowers students to delve into areas of interest, fostering a culture of self-directed learning.</p>
      <h2>Transformation of the Classroom</h2>
      <p>Furthermore, technology has transformed the classroom itself. Interactive smart boards, multimedia presentations, and educational apps have made lessons more engaging and dynamic. Traditional chalk-and-talk methods are being supplemented with visually appealing content that caters to different learning styles. This shift has not only increased student participation but has also allowed educators to personalize their teaching, catering to individual needs and learning paces.</p>
      <h2>Global Collaborative Learning</h2>
      <p>Collaborative learning has also been greatly enhanced by technology. Virtual classrooms and video conferencing tools enable students from different parts of the world to collaborate on projects, share ideas, and engage in discussions. This globalization of education prepares students for an interconnected world and exposes them to diverse perspectives, thereby promoting cultural awareness and empathy.</p>
      <img src="https://images.unsplash.com/photo-1692316991412-fca633984f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" />
      <h2>Challenges and Concerns</h2>
      <p>However, the integration of technology in education also raises concerns. The digital divide, characterized by unequal access to technology, threatens to exacerbate educational inequalities. Students from underprivileged backgrounds may not have the same access to online resources, potentially deepening existing disparities in academic achievement.</p>
      <p>Moreover, the ease of accessing information online has led to challenges related to misinformation and plagiarism. It is crucial for educators to teach students critical thinking skills and ethical use of technology, ensuring that they can discern reliable sources from unreliable ones and properly attribute their work.</p>
      <h2>Conclusion</h2>
      <p>In conclusion, the impact of technology on modern education is undeniable. It has reshaped learning environments, expanded access to knowledge, and facilitated global collaboration. While technology presents opportunities for enhanced learning experiences, it also requires careful navigation to address potential drawbacks. Educators and policymakers must work together to ensure that technology is harnessed in a way that maximizes its benefits while minimizing its limitations, ultimately paving the way for a more innovative and inclusive educational landscape.</p>
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
			<NavigationMenu mode={mode} switchMode={switchMode} />
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
