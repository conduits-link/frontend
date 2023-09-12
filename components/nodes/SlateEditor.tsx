import React, { useState } from "react";
import { Node, createEditor, Transforms, select } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import NoSSR from "../NoSSR";

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

const renderNode = (props: any) => {
	const { attributes, children, element } = props; // Changed 'node' to 'element'

	switch (
		element.type // Changed 'node.type' to 'element.type'
	) {
		case "item":
			return <p {...attributes}>{children}</p>;
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

const SlateEditor = ({ initialValue }: { initialValue: any }) => {
	const editor = withReact(createEditor());

	let i = 0;

	const addSubItem = (nodeIndex: number) => {
		const newSubItem = {
			type: "sub-item",
			children: [{ text: "New Sub-Item " + i++ }],
		};

		const path = [nodeIndex, 1];
		const items = editor.children[path[0]].children[path[1]].children;

		// Insert the new sub-item node at the end of the container's children
		Transforms.insertNodes(editor, newSubItem, {
			at: path.concat([items.length]),
		});
	};

	return (
		<NoSSR>
			<Slate
				editor={editor}
				initialValue={initialValue}
			>
				<Editable
					renderElement={renderNode}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();

							const selection = editor.selection;
							if (selection) {
								const topLevelNode = selection.anchor.path[0];

								const newItem = {
									type: "item",
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
						}
					}}
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
