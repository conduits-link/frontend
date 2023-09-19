import Idea from "@/components/nodes/Idea";
import IdeaContainer from "@/components/nodes/IdeaContainer";
import Paragraph from "@/components/nodes/Paragraph";
import { Editor, Node, Transforms } from "slate";

const renderElement = (
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
		case "heading":
			return <h1 {...attributes}>{children}</h1>;
		default:
			return null;
	}
};

const CustomEditor = {
	isHeading(editor: Editor) {
		const [match] = Editor.nodes(editor, {
			match: (n) => n.type === "heading",
		});

		return !!match;
	},
	toggleHeading(editor: Editor) {
		const isActive = CustomEditor.isHeading(editor);
		Transforms.setNodes(
			editor,
			{ type: isActive ? "paragraph" : "heading" },
			{ match: (n) => Editor.isBlock(editor, n) }
		);
		console.log(editor.children);
	},
};

export { renderElement, CustomEditor };
