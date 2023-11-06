import { useRouter } from "next/navigation";

import {
	FaArrowRightToBracket,
	FaChevronLeft,
	FaEye,
	FaPenFancy,
} from "react-icons/fa6";

import Button from "../buttons/Button";

import styles from "./NavigationMenu.module.css";

export default function NavigationMenu({
	mode,
	switchMode,
	save,
}: {
	mode: string;
	switchMode: (mode: string) => void;
	save: () => void;
}) {
	const router = useRouter();

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
						onClick={save}
					>
						<FaArrowRightToBracket />
					</Button>
				</div>
			</div>
		</div>
	);
}
