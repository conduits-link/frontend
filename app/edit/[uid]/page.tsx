"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./page.module.css";
import { withReact } from "slate-react";
import { Editor, createEditor } from "slate";
import { getStoreLocation } from "@/utils/storage";
import { convertNestedDocToMarkdown } from "@/utils/parse";

const Edit = ({ params }: { params: any }) => {
	const searchParams = useSearchParams();

	const [initialValue, setInitialValue] = useState<any[]>([]);

	const [mode, setMode] = useState<string>(
		["edit", "preview"].includes(searchParams.get("mode")!)
			? searchParams.get("mode")!
			: "edit"
	);

	function switchMode(newMode: string) {
		setMode(newMode);
	}

	// Stop remounting from breaking Slate children prop
	const editor = useMemo(() => withReact(createEditor()), []);

	const [fileContent, setFileContent] = useState("");
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/store/doc", {
			method: "POST",
			body: JSON.stringify({
				storeLocation: getStoreLocation(),
				fileName: params.uid,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setInitialValue(data.doc.docStructure);
				setFileContent(data.doc.content);
				setLoading(false);
			});
	}, []);

	if (isLoading) return <p>Loading...</p>;

	function save() {
		fetch("/api/store/doc", {
			method: "PUT",
			body: JSON.stringify({
				storeLocation: getStoreLocation(),
				fileName: params.uid,
				docStructure: editor.children,
			}),
		});
	}

	return (
		<div className={styles.container}>
			<NavigationMenu
				mode={mode}
				switchMode={switchMode}
				save={save}
			/>
			<SlateEditor
				editor={editor}
				className={styles.page}
				initialValue={initialValue}
				readOnly={mode !== "edit"}
				mode={mode}
			/>
			{mode !== "preview" && <FixedFormatMenu editor={editor} />}
		</div>
	);
};

export default Edit;
