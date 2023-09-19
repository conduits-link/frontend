import { Editor, Node } from "slate";

import FormatButton from "../buttons/FormatButton";

import styles from "./FixedFormatMenu.module.css";

export default function FixedMenu({ editor }: { editor: Editor }) {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<FormatButton
					editor={editor}
					nodeType={"heading"}
					className={""}
				>
					H
				</FormatButton>
			</div>
		</div>
	);
}
