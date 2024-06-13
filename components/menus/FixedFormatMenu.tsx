import { Editor } from "slate";

import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

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
					<LuHeading1 />
				</FormatButton>
				<FormatButton
					editor={editor}
					nodeType={"heading"}
					options={{ level: 2 }}
					className={""}
				>
					<LuHeading2 />
				</FormatButton>
				<FormatButton
					editor={editor}
					nodeType={"heading"}
					options={{ level: 3 }}
					className={""}
				>
					<LuHeading3 />
				</FormatButton>
			</div>
		</div>
	);
}
