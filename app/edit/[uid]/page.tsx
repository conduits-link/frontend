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
import Loading from "@/components/wrappers/Loading";
import { parseFileName } from "@/utils/parse";

const Page = ({ params }: { params: any }) => {
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
	}, [params.uid]);

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
				storeLocation: getStoreLocation(),
				fileName: params.uid,
				docStructure: editor.children,
			}),
		});
	}

	// Stop remounting from breaking Slate children prop
	const editor = useMemo(() => withReact(createEditor()), []);

	if (isLoading)
		return (
			<div style={{ height: "100vh" }}>
				<Loading>
					Loading &apos;{parseFileName(params.uid)}&apos;...
				</Loading>
			</div>
		);

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

export default Page;
