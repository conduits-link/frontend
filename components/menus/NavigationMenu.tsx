import {
	GoChevronLeft,
	GoCrossReference,
	GoDownload,
	GoEye,
	GoPencil,
} from "react-icons/go";

import Button from "../buttons/Button";

import styles from "./NavigationMenu.module.css";

export default function NavigationMenu({
	mode,
	setMode,
}: {
	mode: string;
	setMode: any;
}) {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<div className={styles.returnContainer}>
					<Button className={styles.returnButton} onClick={() => {}}>
						<GoChevronLeft />
					</Button>
					<div className={styles.returnInfo}>
						<div className={styles.returnInfoTitle}>Example document</div>
						<small className={styles.returnInfoTime}>
							Edited just now
						</small>
					</div>
				</div>
				<div className={styles.modeContainer}>
					<button
						className={
							styles.modeButton +
							(mode === "edit" ? " " + styles.modeButtonActive : "")
						}
						onClick={() => setMode("edit")}
					>
						<GoPencil />
					</button>
					<button
						className={
							styles.modeButton +
							(mode === "review" ? " " + styles.modeButtonActive : "")
						}
						onClick={() => setMode("review")}
					>
						<GoCrossReference />
					</button>
					<button
						className={
							styles.modeButton +
							(mode === "preview" ? " " + styles.modeButtonActive : "")
						}
						onClick={() => setMode("preview")}
					>
						<GoEye />
					</button>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						className={styles.button + " " + styles.buttonPrimary}
						onClick={() => {}}
					>
						<GoDownload />
					</Button>
				</div>
			</div>
		</div>
	);
}
