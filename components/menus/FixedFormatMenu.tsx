import { Editor } from "slate";

import {
	LuCode2,
	LuHeading1,
	LuHeading2,
	LuHeading3,
	LuImage,
	LuList,
	LuListOrdered,
	LuQuote,
} from "react-icons/lu";

import { ElementType } from "@/utils/editor/slate";

import FormatButton from "../buttons/FormatButton";

import styles from "./FixedFormatMenu.module.css";

export default function FixedMenu({ editor }: { editor: Editor }) {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Heading}
					options={{ level: 1 }}
				>
					<LuHeading1 />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Heading}
					options={{ level: 2 }}
				>
					<LuHeading2 />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Heading}
					options={{ level: 3 }}
				>
					<LuHeading3 />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.ListOrderedItem}
					options={{}}
				>
					<LuListOrdered />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.ListUnorderedItem}
					options={{}}
				>
					<LuList />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Image}
					options={{}}
					promptOption={"url"}
					appendNode={true}
				>
					<LuImage />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Blockquote}
					options={{}}
				>
					<LuQuote />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={true}
					type={ElementType.Codeblock}
					options={{}}
				>
					<LuCode2 />
				</FormatButton>
			</div>
			{/* <div className={styles.element}>
				<FormatButton editor={editor} isNode={false} type={"bold"}>
					<LuBold />
				</FormatButton>
				<FormatButton editor={editor} isNode={false} type={"italic"}>
					<LuItalic />
				</FormatButton>
				<FormatButton
					editor={editor}
					isNode={false}
					promptOption={"url"}
					type={"link"}
				>
					<LuLink />
				</FormatButton>
				<FormatButton editor={editor} isNode={false} type={"strikethrough"}>
					<LuStrikethrough />
				</FormatButton>
				<FormatButton editor={editor} isNode={false} type={"code"}>
					<LuCode />
				</FormatButton>
			</div> */}
		</div>
	);
}
