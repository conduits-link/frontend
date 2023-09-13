"use client";

import React, { useState } from "react";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./page.module.css";

const initialValue = [
	{
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: "In the heart of a charming village nestled between rolling hills, life unfolded at a leisurely pace. The cobblestone streets wound their way through rows of quaint cottages, each adorned with vibrant flower gardens that spilled color onto the sidewalks. The town square buzzed with activity as vendors set up their stalls, showcasing an array of artisanal crafts and locally grown produce. Children's laughter echoed from the nearby park, where a graceful willow tree provided shade for families enjoying a leisurely afternoon. The scent of freshly baked bread wafted from the bakery, enticing passersby with promises of warmth and comfort.",
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
						text: "Underneath the canvas of a star-studded night sky, a different kind of magic emerged. A bonfire crackled and danced on the beach, casting a warm glow that drew people closer. Friends gathered in a circle, their faces illuminated by the flickering flames, sharing stories and marshmallows. The rhythmic sound of waves crashing against the shore provided a soothing backdrop to the symphony of laughter and conversation. Above, constellations painted intricate patterns across the heavens, igniting a sense of wonder and curiosity. As the night grew deeper, the sky transformed into a tapestry of inky blackness, allowing the brilliance of distant galaxies to capture the imagination of all who gazed upward.",
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

	return (
		<div className={styles.container}>
			<NavigationMenu
				mode={mode}
				switchMode={switchMode}
			/>
			<SlateEditor
				className={styles.page}
				initialValue={initialValue}
				readOnly={mode !== "edit"}
			/>
			{mode !== "preview" && <FixedFormatMenu />}
		</div>
	);
};

export default Edit;
