import React, { ChangeEventHandler, useState } from "react";
import {
	Node,
	createEditor,
	Transforms,
	select,
	Editor,
	Descendant,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import NoSSR from "./NoSSR";
import {
	CustomEditor,
	onChange,
	onType,
	renderElement,
	renderLeaf,
} from "@/utils/editor";

// TODO: Slate.js types - I THINK THESE SHOULD BE USED TO REDUCE ERRORS
type CustomElement = {
	type: "paragraph" | "container" | "sub-item";
	children: CustomText[];
};
type CustomText = { text: string };
declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

const SlateEditor = ({
	editor,
	className,
	file,
	readOnly,
	mode,
}: {
	editor: Editor;
	className?: string;
	file: any;
	readOnly: boolean;
	mode: string;
}) => {
	return (
		<NoSSR>
			<Slate
				editor={editor}
				initialValue={file.body}
				onChange={(value: Descendant[]) => onChange(value, editor)}
			>
				<Editable
					className={className}
					renderElement={(props) =>
						renderElement({ ...props }, editor, mode) || <></>
					}
					renderLeaf={(props) => renderLeaf({ ...props }, editor, mode)}
					onKeyDown={(e: React.KeyboardEvent) => onType(e, editor)}
					readOnly={readOnly}
				/>
			</Slate>
		</NoSSR>
	);
};

export default SlateEditor;
