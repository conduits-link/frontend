"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./RootEditor.module.css";
import { Editor, createEditor } from "slate";
import { withReact } from "slate-react";

export default async ({ file, uid }: { file: any; uid: string }) => {
	// // Stop remounting from breaking Slate children prop
	const editor = useMemo(() => withReact(createEditor()), []);

	const searchParams = useSearchParams();
	const [mode, setMode] = useState<string>(
		["edit", "preview"].includes(searchParams.get("mode")!)
			? searchParams.get("mode")!
			: "edit"
	);

	function switchMode(newMode: string) {
		setMode(newMode);
	}

	function save() {
		fetch("/api/store/doc", {
			method: "PUT",
			body: JSON.stringify({
				storeLocation: process.env.STORE_LOCATION,
				fileName: uid,
				docStructure: editor.children,
			}),
		});
	}

	// useEffect(() => {
	// 	const f = fetch("http://localhost:3000/api/store/doc", {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			storeLocation: "/home/dan/Downloads",
	// 			fileName: "AScaryRabbit.md",
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => console.log(JSON.stringify(data.doc, null, 2)));
	// });

	return (
		<div className={styles.container}>
			<NavigationMenu
				file={file}
				mode={mode}
				switchMode={switchMode}
				save={save}
			/>
			<SlateEditor
				editor={editor}
				className={styles.page}
				file={file}
				readOnly={mode !== "edit"}
				mode={mode}
			/>
			{mode !== "preview" && <FixedFormatMenu editor={editor} />}
		</div>
	);
};
