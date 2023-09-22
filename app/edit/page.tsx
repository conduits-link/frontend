"use client";

import React, { useState } from "react";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./page.module.css";
import { withReact } from "slate-react";
import { createEditor } from "slate";

const initialValue = [
	{
		type: "heading",
		level: 1,
		children: [{ text: "Quantum Entanglement" }],
	},
	{
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: "Quantum entanglement, a perplexing phenomenon within the domain of quantum physics, transpires when two or more particles intricately intertwine to such an extent that the individual state of any given particle cannot be autonomously delineated in isolation from the state of its entangled counterparts, regardless of the formidable spatial expanse segregating them. This enigmatic occurrence, often elucidated by the renowned Albert Einstein as an eerie manifestation of action transpiring at a remote distance, begets the extraordinary consequence that upon the measurement of one entangled particle, its innate properties, including spin and polarization, instantaneously manifest a state of correlation with their corresponding attributes in the remote particle, even in circumstances where the measure of separation is on the order of light-years.",
					},
				],
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: "Quantum entanglement has engendered an environment rife with intense scholarly scrutiny and spirited discourse within the annals of quantum physics. Its pragmatic pertinence extends into the realm of quantum computing and cryptology, wherein these entangled particles offer the tantalizing prospect of establishing secure channels of communication. Furthermore, it unflinchingly interrogates the foundations of our classical physics-based comprehension, proffering an incisive critique of our conventional intuitions about the ontological character of reality and the astonishing interwoven relationships between particles inhabiting the bewildering terrain of the quantum realm.",
					},
				],
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: "Quantum entanglement has been a subject of intense study and debate among physicists. It has practical implications for quantum computing and cryptography, where entangled particles can be used to create secure communication channels. Additionally, it challenges our classical understanding of physics, raising questions about the nature of reality and the interconnectedness of particles in the quantum world.",
					},
				],
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: "In summary, quantum entanglement is a mysterious and fundamental concept in quantum physics, where particles become interconnected in ways that defy classical intuition, with profound implications for technology and our understanding of the universe.",
					},
				],
			},
		],
	},
];

const Edit = () => {
	const [mode, setMode] = useState<string>("edit");

	function switchMode(newMode: string) {
		setMode(newMode);
	}

	const editor = withReact(createEditor());

	return (
		<div className={styles.container}>
			<NavigationMenu
				mode={mode}
				switchMode={switchMode}
			/>
			<SlateEditor
				editor={editor}
				className={styles.page}
				initialValue={initialValue}
				readOnly={mode !== "edit"}
			/>
			{mode !== "preview" && <FixedFormatMenu editor={editor} />}
		</div>
	);
};

export default Edit;
