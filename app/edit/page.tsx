"use client";

import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// TypeScript users only add this code
import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";

// Slate.js types
type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };
declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
// Import the `Editor` and `Transforms` helpers from Slate.
import { Editor, Transforms, Element } from "slate";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph." }],
	},
];

// Define our own custom set of helpers.
const CustomEditor = {
	isBoldMarkActive(editor: Editor) {
		const marks = Editor.marks(editor);
		return marks ? marks.bold === true : false;
	},
	isCodeBlockActive(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "code",
		});

		return !!match;
	},
	toggleBoldMark(editor: Editor) {
		const isActive = CustomEditor.isBoldMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "bold");
		} else {
			Editor.addMark(editor, "bold", true);
		}
	},
	toggleCodeBlock(editor: Editor) {
		const isActive = CustomEditor.isCodeBlockActive(editor);
		const newProperties: Partial<CustomElement> = {
			type: isActive ? "paragraph" : "code",
		};

		Transforms.setNodes(editor, newProperties);
	},
};

const Edit = () => {
	const [editor] = useState(() => withReact(createEditor()));

	const renderElement = useCallback((props: any) => {
		switch (props.element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	const renderLeaf = useCallback((props: any) => {
		return <Leaf {...props} />;
	}, []);

	return (
		// Add a toolbar with buttons that call the same methods.
		<Slate
			editor={editor}
			initialValue={initialValue}
		>
			<div>
				<button
					onMouseDown={(event) => {
						event.preventDefault();
						CustomEditor.toggleBoldMark(editor);
					}}
				>
					Bold
				</button>
				<button
					onMouseDown={(event) => {
						event.preventDefault();
						CustomEditor.toggleCodeBlock(editor);
					}}
				>
					Code Block
				</button>
			</div>
			<Editable
				editor={editor}
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={(event) => {
					if (!event.ctrlKey) {
						return;
					}

					switch (event.key) {
						case "`": {
							event.preventDefault();
							CustomEditor.toggleCodeBlock(editor);
							break;
						}

						case "b": {
							event.preventDefault();
							CustomEditor.toggleBoldMark(editor);
							break;
						}
					}
				}}
			/>
		</Slate>
	);
};

const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

const DefaultElement = (props: any) => {
	return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
	return (
		<span
			{...props.attributes}
			style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
		>
			{props.children}
		</span>
	);
};

export default Edit;
