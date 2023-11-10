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

export default function NavigationMenu({
	file,
	mode,
	switchMode,
	save,
}: {
	file: any;
	mode: string;
	switchMode: (mode: string) => void;
	save: () => void;
}) {
	const router = useRouter();

	const [lastModified, setLastModified] = useState<string>("");

	useEffect(() => {
		setLastModified(file.modified);
	}, []);

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
						<div className={styles.returnInfoTitle}>{file.title}</div>
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
