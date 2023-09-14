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

const renderNode = (
	{
		attributes,
		children,
		element,
	}: {
		attributes: any;
		children: any;
		element: any;
	},
	editor: Editor
) => {
	switch (
		element.type // Changed 'node.type' to 'element.type'
	) {
		case "text":
			return <span {...attributes}>{children}</span>;
		case "idea-container":
			return (
				<IdeaContainer
					{...attributes}
					editor={editor}
					node={element}
				>
					{children}
				</IdeaContainer>
			);
		case "idea":
			return (
				<Idea
					{...attributes}
					editor={editor}
					node={element}
				>
					{children}
				</Idea>
			);
		case "paragraph":
			return (
				<Paragraph
					{...attributes}
					editor={editor}
					node={element}
				>
					{children}
				</Paragraph>
			);
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
				onChange={(document) => {}}
			>
				<Editable
					className={className}
					renderElement={(props) => renderNode({ ...props }, editor)}
					onKeyDown={newline}
					readOnly={readOnly}
				/>
			</Slate>
		</NoSSR>
	);
};

export default SlateEditor;
