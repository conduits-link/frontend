import React, { useState } from "react";
import { Node, createEditor, Transforms, select, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import NoSSR from "./NoSSR";
import Paragraph from "@/components/nodes/Paragraph";
import IdeaContainer from "../nodes/IdeaContainer";
import Idea from "../nodes/Idea";
import { CustomEditor, renderElement } from "@/utils/editor";

// Slate.js types - I THINK THESE SHOULD BE USED TO REDUCE ERRORS
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
	initialValue,
	readOnly,
	mode,
}: {
	editor: Editor;
	className?: string;
	initialValue: any;
	readOnly: boolean;
	mode: string;
}) => {
	const keypress = (e: KeyboardEvent) => {
		switch (e.key) {
			case "Enter": {
				e.preventDefault();

				const selection = editor.selection;
				if (selection) {
					const topLevelNode = selection.anchor.path[0];

					const newItem = {
						type: "paragraph",
						children: [
							{
								type: "text",
								children: [{ text: "" }],
							},
						],
					};

					// Insert the new sub-item node at the end of the container's children
					Transforms.insertNodes(editor, newItem, {
						at: [topLevelNode + 1],
					});

					Transforms.select(editor, [topLevelNode + 1]);
				}

				break;
			}
		}

		if (e.ctrlKey) {
			e.preventDefault();

			switch (e.key) {
				case "b": {
					console.log("bold");
					break;
				}
			}
		}
	};

	return (
		<NoSSR>
			<Slate
				editor={editor}
				initialValue={initialValue}
				onChange={(document) => {}}
			>
				<Editable
					className={className}
					renderElement={(props) =>
						renderElement({ ...props }, editor, mode)
					}
					onKeyDown={keypress}
					readOnly={readOnly}
				/>
			</Slate>
		</NoSSR>
	);
};

export default SlateEditor;
