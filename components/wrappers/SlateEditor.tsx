import React, { useState } from "react";
import { Node, createEditor, Transforms, select } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import NoSSR from "./NoSSR";
import Paragraph from "@/components/nodes/Paragraph";

// Slate.js types
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

const renderNode = ({
	attributes,
	children,
	element,
}: {
	attributes: any;
	children: any;
	element: any;
}) => {
	switch (
		element.type // Changed 'node.type' to 'element.type'
	) {
		case "paragraph":
			return <Paragraph {...attributes}>{children}</Paragraph>;
		case "text":
			return <span {...attributes}>{children}</span>;
		case "container":
			return <div {...attributes}>{children}</div>;
		case "sub-item":
			return <div {...attributes}>{children}</div>;
		default:
			return null;
	}
};

const SlateEditor = ({
	className,
	initialValue,
	readOnly,
}: {
	className?: string;
	initialValue: any;
	readOnly: boolean;
}) => {
	const editor = withReact(createEditor());

	let i = 0;

	const addSubItem = (nodeIndex: number) => {
		const newSubItem = {
			type: "sub-item",
			children: [{ text: "Sub item " + i++ }],
		};

		const path = [nodeIndex, 1];
		const items = editor.children[path[0]].children[path[1]].children;

		// Insert the new sub-item node at the end of the container's children
		Transforms.insertNodes(editor, newSubItem, {
			at: path.concat([items.length]),
		});
	};

	const newline = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
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
						{
							type: "container",
							children: [],
						},
					],
				};

				// Insert the new sub-item node at the end of the container's children
				Transforms.insertNodes(editor, newItem, {
					at: [topLevelNode + 1],
				});

				Transforms.select(editor, [topLevelNode + 1]);
			}
		}
	};

	return (
		<NoSSR>
			<Slate
				editor={editor}
				initialValue={initialValue}
			>
				<Editable
					className={className}
					renderElement={renderNode}
					onKeyDown={newline}
					readOnly={readOnly}
				/>
				<button
					onClick={() => {
						addSubItem(1);
					}}
				>
					Add Sub-Item
				</button>
			</Slate>
		</NoSSR>
	);
};

export default SlateEditor;
