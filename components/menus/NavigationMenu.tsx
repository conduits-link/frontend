"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
	FaArrowRightToBracket,
	FaChevronLeft,
	FaEye,
	FaPenFancy,
} from "react-icons/fa6";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";
import { timeAgo } from "@/utils/helpers";

import Button from "../buttons/Button";
import { Editor } from "slate";

import styles from "./NavigationMenu.module.css";

export default function NavigationMenu({
	editor,
	file,
	mode,
	switchMode,
	uid,
}: {
	editor: Editor;
	file: any;
	mode: string;
	switchMode: (mode: string) => void;
	uid: string;
}) {
	const router = useRouter();
	const { showFlashMessage } = useFlashMessage();

	const [title, setTitle] = useState<string>(file.title);
	const [lastModified, setLastModified] = useState<string>("");

	async function save() {
		await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs/${uid}`,
				method: "PUT",
				cookie: "",
				data: {
					doc: {
						title: title,
						body: editor.children,
					},
				},
			},
			showFlashMessage
		);
	}

	useEffect(() => {
		setLastModified(file.modified);
	}, [file.modified]);

	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<div className={styles.returnContainer}>
					<Button
						className={styles.returnButton}
						onClick={() => {
							router.push("/");
						}}
					>
						<FaChevronLeft />
					</Button>
					<div className={styles.returnInfo}>
						<div className={styles.returnInfoTitle}>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<small className={styles.returnInfoTime}>
							Edited {timeAgo(lastModified)}
						</small>
					</div>
				</div>
				<div className={styles.modeContainer}>
					<button
						className={
							styles.modeButton +
							(mode === "edit" ? " " + styles.modeButtonActive : "")
						}
						onClick={() => switchMode("edit")}
					>
						<FaPenFancy />
					</button>
					{/* Add a review mode for spelling, grammar, structure recommendations, comments, etc. */}
					<button
						className={
							styles.modeButton +
							(mode === "preview" ? " " + styles.modeButtonActive : "")
						}
						onClick={() => switchMode("preview")}
					>
						<FaEye />
					</button>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						primary={true}
						onClick={() => {
							setLastModified(new Date().toISOString());
							save();
						}}
					>
						<FaArrowRightToBracket />
					</Button>
				</div>
			</div>
		</div>
	);
}
