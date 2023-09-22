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
					options={{ level: 1 }}
					className={""}
				>
					H1
				</FormatButton>
				<FormatButton
					editor={editor}
					nodeType={"heading"}
					options={{ level: 2 }}
					className={""}
				>
					H2
				</FormatButton>
				<FormatButton
					editor={editor}
					nodeType={"heading"}
					options={{ level: 3 }}
					className={""}
				>
					H3
				</FormatButton>
			</div>
		</div>
	);
}
