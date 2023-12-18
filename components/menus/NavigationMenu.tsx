import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
	FaArrowRightToBracket,
	FaChevronLeft,
	FaEye,
	FaPenFancy,
} from "react-icons/fa6";

import { timeAgo } from "@/utils/helpers";

import Button from "../buttons/Button";

import styles from "./NavigationMenu.module.css";
import sendFetch from "@/utils/fetch";
import { Editor } from "slate";

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

	const [title, setTitle] = useState<string>(file.title);
	const [lastModified, setLastModified] = useState<string>("");

	async function save() {
		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_API_URL}/store/docs/${uid}`,
			"PUT",
			"",
			{
				file: {
					title: title,
					body: editor.children,
				},
			}
		)) as apiResponse;

		if (res.data.file._id !== uid) {
			router.push(`/edit/${res.data.file._id}`);
		}
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
							router.push("/store");
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
							(mode === "edit"
								? " " + styles.modeButtonActive
								: "")
						}
						onClick={() => switchMode("edit")}
					>
						<FaPenFancy />
					</button>
					{/* Add a review mode for spelling, grammar, structure recommendations, comments, etc. */}
					<button
						className={
							styles.modeButton +
							(mode === "preview"
								? " " + styles.modeButtonActive
								: "")
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
