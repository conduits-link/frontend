import { Editor } from "@tiptap/react";

import FixedFormatSubMenu from "./FixedFormatSubMenu";
import Heading1FormatButton from "@/components/buttons/format/Heading1FormatButton";
import Heading2FormatButton from "@/components/buttons/format/Heading2FormatButton";
import Heading3FormatButton from "@/components/buttons/format/Heading3FormatButton";
import BulletListFormatButton from "@/components/buttons/format/BulletListFormatButton";
import OrderedListFormatButton from "@/components/buttons/format/OrderedListFormatButton";
import TaskListFormatButton from "@/components/buttons/format/TaskListFormatButton";
import ImageFormatButton from "@/components/buttons/format/ImageFormatButton";
import CodeBlockFormatButton from "@/components/buttons/format/CodeBlockFormatButton";
import InsertTableFormatButton from "@/components/buttons/format/table/InsertTableFormatButton";
import AddColumnBeforeFormatButton from "@/components/buttons/format/table/AddColumnBeforeFormatButton";
import AddColumnAfterFormatButton from "@/components/buttons/format/table/AddColumnAfterFormatButton";
import DeleteColumnFormatButton from "@/components/buttons/format/table/DeleteColumnFormatButton";
import AddRowBeforeFormatButton from "@/components/buttons/format/table/AddRowBeforeFormatButton";
import AddRowAfterFormatButton from "@/components/buttons/format/table/AddRowAfterFormatButton";
import DeleteRowFormatButton from "@/components/buttons/format/table/DeleteRowFormatButton";
import MergeCellsFormatButton from "@/components/buttons/format/table/MergeCellsFormatButton";
import SplitCellFormatButton from "@/components/buttons/format/table/SplitCellFormatButton";
import BoldFormatButton from "@/components/buttons/format/BoldFormatButton";
import ItalicFormatButton from "@/components/buttons/format/ItalicFormatButton";
import StrikeFormatButton from "@/components/buttons/format/StrikeFormatButton";
import LinkFormatButton from "@/components/buttons/format/LinkFormatButton";
import CodeFormatButton from "@/components/buttons/format/CodeFormatButton";

import styles from "./FixedFormatMenu.module.css";

export default function FixedMenu({ editor }: { editor: Editor }) {
	return (
		<div className={styles.container}>
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
				<ImageFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
					key={6}
				/>
				<CodeBlockFormatButton
					editor={editor}
					className={styles.button + " " + styles.elementSpacer}
					key={7}
				/>
				<FixedFormatSubMenu className={styles.elementSpacer}>
					<InsertTableFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={8}
					/>
					<AddColumnBeforeFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={9}
					/>
					<AddColumnAfterFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={10}
					/>
					<DeleteColumnFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={11}
					/>
					<AddRowBeforeFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={12}
					/>
					<AddRowAfterFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={13}
					/>
					<DeleteRowFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={14}
					/>
					<MergeCellsFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={15}
					/>
					<SplitCellFormatButton
						editor={editor}
						className={styles.button + " " + styles.elementSpacer}
						key={16}
					/>
				</FixedFormatSubMenu>
			</div>
		</div>
	);
}
