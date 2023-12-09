"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./RootEditor.module.css";
import { Editor, createEditor } from "slate";
import { withReact } from "slate-react";
import sendFetch from "@/utils/fetch";

const RootEditorComponent = ({ file, uid }: { file: any; uid: string }) => {
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
		sendFetch(
			`${process.env.NEXT_PUBLIC_API_URL}/store/docs/${uid}`,
			"PUT",
			"",
			{
				file: {
					title: uid,
					body: editor.children,
				},
			}
		);
	}

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

export default RootEditorComponent;
