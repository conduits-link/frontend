import { Editor } from "@tiptap/react";

import Heading1FormatButton from "@/components/buttons/format/Heading1FormatButton";
import Heading2FormatButton from "@/components/buttons/format/Heading2FormatButton";
import Heading3FormatButton from "@/components/buttons/format/Heading3FormatButton";
import OrderedListFormatButton from "@/components/buttons/format/OrderedListFormatButton";
import TaskListFormatButton from "../buttons/format/TaskListFormatButton";
import BulletListFormatButton from "@/components/buttons/format/BulletListFormatButton";
import CodeBlockFormatButton from "@/components/buttons/format/CodeBlockFormatButton";
import LatexFormatButton from "../buttons/format/LatexFormatButton";
import BoldFormatButton from "@/components/buttons/format/BoldFormatButton";
import ItalicFormatButton from "@/components/buttons/format/ItalicFormatButton";
import StrikeFormatButton from "@/components/buttons/format/StrikeFormatButton";
import CodeFormatButton from "@/components/buttons/format/CodeFormatButton";
import LinkFormatButton from "../buttons/format/LinkFormatButton";

import styles from "./FixedFormatMenu.module.css";
import FixedFormatSubMenu from "./FixedFormatSubMenu";

export default function FixedMenu({ editor }: { editor: Editor }) {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<FixedFormatSubMenu className={styles.elementSpacer}>
					<Heading1FormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={0}
					/>
					<Heading2FormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={1}
					/>
					<Heading3FormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={2}
					/>
				</FixedFormatSubMenu>
				<FixedFormatSubMenu className={styles.elementSpacer}>
					<BulletListFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={3}
					/>
					<OrderedListFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={4}
					/>
					<TaskListFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={5}
					/>
				</FixedFormatSubMenu>
				<CodeBlockFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
				<LatexFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
			</div>
			<div className={styles.element}>
				<BoldFormatButton
					className={styles.button + " " + styles.elementSpacer}
					editor={editor}
				/>
				<ItalicFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
				<StrikeFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
				<LinkFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
				<CodeFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
				/>
			</div>
		</div>
	);
}
