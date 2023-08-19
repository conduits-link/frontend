import { GoChevronLeft } from "react-icons/go";

import Button from "../buttons/Button";

import styles from "./NavigationMenu.module.css";

export default function NavigationMenu() {
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
				<div></div>
				<div className={styles.buttonContainer}>
					<Button className={styles.button} onClick={() => {}}>
						Preview
					</Button>
					<Button
						className={styles.button + " " + styles.buttonPrimary}
						onClick={() => {}}
					>
						Download
					</Button>
				</div>
			</div>
		</div>
	);
}
