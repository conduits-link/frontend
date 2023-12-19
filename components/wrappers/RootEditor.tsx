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

import NoSSR from "./NoSSR";

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

	return (
		<NoSSR>
			<div className={styles.container}>
				<NavigationMenu
					editor={editor}
					file={file}
					mode={mode}
					switchMode={switchMode}
					uid={uid}
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
		</NoSSR>
	);
};

export default RootEditorComponent;
