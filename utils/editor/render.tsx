import { Editor } from "slate";

import { CustomElement, ElementType } from "./slate";

import ListUnordered from "@/components/nodes/ListUnordered";
import ListOrdered from "@/components/nodes/ListOrdered";
import Blockquote from "@/components/nodes/Blockquote";
import Paragraph from "@/components/nodes/Paragraph";
import Codeblock from "@/components/nodes/Codeblock";
import ListItem from "@/components/nodes/ListItem";
import Heading from "@/components/nodes/Heading";
import Image from "@/components/nodes/Image";

export const renderElement = (
	{
		attributes,
		children,
		element,
	}: {
		attributes: any;
		children: any;
		element: CustomElement;
	},
	editor: Editor,
	mode: string
) => {
	switch (element.type) {
		// case "idea-container":
		// 	return (
		// 		<IdeaContainer
		// 			{...attributes}
		// 			editor={editor}
		// 			node={element}
		// 			mode={mode}
		// 		>
		// 			{children}
		// 		</IdeaContainer>
		// 	);
		// case "idea":
		// 	return (
		// 		<Idea {...attributes} editor={editor} node={element} mode={mode}>
		// 			{children}
		// 		</Idea>
		// 	);
		case ElementType.Paragraph:
			return (
				<Paragraph
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</Paragraph>
			);
		case ElementType.Heading:
			return (
				<Heading {...attributes} editor={editor} node={element} mode={mode}>
					{children}
				</Heading>
			);
		case ElementType.ListOrderedItem:
			return (
				<ListItem
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</ListItem>
			);
		case ElementType.ListUnorderedItem:
			return (
				<ListItem
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</ListItem>
			);
		case ElementType.ListOrdered:
			return (
				<ListOrdered
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</ListOrdered>
			);
		case ElementType.ListUnordered:
			return (
				<ListUnordered
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</ListUnordered>
			);
		case ElementType.Image:
			return (
				<Image {...attributes} editor={editor} node={element} mode={mode}>
					{children}
				</Image>
			);
		case ElementType.Blockquote:
			return (
				<Blockquote
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</Blockquote>
			);
		case ElementType.Codeblock:
			return (
				<Codeblock
					{...attributes}
					editor={editor}
					node={element}
					mode={mode}
				>
					{children}
				</Codeblock>
			);
		default:
			return <span {...attributes}>{children}</span>;
	}
};

export const renderLeaf = (props: any, editor: Editor, mode: string) => {
	const markStyles = {
		fontWeight: props.leaf.bold ? "bold" : "normal",
		fontStyle: props.leaf.italic ? "italic" : "normal",
		textDecoration: props.leaf.strikethrough ? "line-through" : "none",
		backgroundColor: props.leaf.code ? "grey" : "transparent",
	};

	if (props.leaf.link) {
		return (
			<a {...props.attributes} style={markStyles} href={props.leaf.link.url}>
				{props.children}
			</a>
		);
	} else
		return (
			<span {...props.attributes} style={markStyles}>
				{props.children}
			</span>
		);
};
