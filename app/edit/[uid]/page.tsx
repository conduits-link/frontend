"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { withReact } from "slate-react";
import { createEditor } from "slate";

import { getStoreLocation } from "@/utils/storage";

import NavigationMenu from "@/components/menus/NavigationMenu";
import FixedFormatMenu from "@/components/menus/FixedFormatMenu";
import SlateEditor from "@/components/wrappers/SlateEditor";

import styles from "./page.module.css";

const Edit = ({ params }: { params: any }) => {
	const searchParams = useSearchParams();
	const [mode, setMode] = useState<string>(
		["edit", "preview"].includes(searchParams.get("mode")!)
			? searchParams.get("mode")!
			: "edit"
	);

	function switchMode(newMode: string) {
		setMode(newMode);
	}

	const [isLoading, setLoading] = useState(true);
	const [file, setFile] = useState<Object>("");

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
				setFile(data.doc);
				setLoading(false);
			});
	}, []);

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

	// Stop remounting from breaking Slate children prop
	const editor = useMemo(() => withReact(createEditor()), []);

	return (
		<div className={styles.container}>
			<NavigationMenu
				mode={mode}
				switchMode={switchMode}
				save={save}
			/>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<SlateEditor
						editor={editor}
						className={styles.page}
						initialValue={file.docStructure}
						readOnly={mode !== "edit"}
						mode={mode}
					/>
					{mode !== "preview" && <FixedFormatMenu editor={editor} />}
				</>
			)}
		</div>
	);
};

export default Edit;
