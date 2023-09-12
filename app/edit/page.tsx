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
				children: [{ text: "Main content" }],
			},
			{
				type: "container",
				children: [
					{
						type: "sub-item",
						children: [{ text: "Sub item 1" }],
					},
					{
						type: "sub-item",
						children: [{ text: "Sub item 2" }],
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
				children: [{ text: "Main content" }],
			},
			{
				type: "container",
				children: [
					{
						type: "sub-item",
						children: [{ text: "Sub item 1" }],
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
