import { Editor, FloatingMenu } from "@tiptap/react";

import Heading1FormatButton from "@/components/buttons/format/Heading1FormatButton";
import Heading2FormatButton from "@/components/buttons/format/Heading2FormatButton";
import Heading3FormatButton from "@/components/buttons/format/Heading3FormatButton";
import OrderedListFormatButton from "@/components/buttons/format/OrderedListFormatButton";
import BulletListFormatButton from "@/components/buttons/format/BulletListFormatButton";
import CodeBlockFormatButton from "@/components/buttons/format/CodeBlockFormatButton";

import styles from "./FloatingFormatMenu.module.css";

export default function FloatingFormatMenu({ editor }: { editor: Editor }) {
	return (
		<FloatingMenu
			className={styles.container}
			editor={editor}
			tippyOptions={{ duration: 100 }}
		>
			<Heading1FormatButton editor={editor} className={styles.element} />
			<Heading2FormatButton editor={editor} className={styles.element} />
			<Heading3FormatButton editor={editor} className={styles.element} />
			<BulletListFormatButton editor={editor} className={styles.element} />
			<OrderedListFormatButton editor={editor} className={styles.element} />
			<CodeBlockFormatButton editor={editor} className={styles.element} />
		</FloatingMenu>
	);
}
