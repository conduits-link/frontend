import Heading from "@/components/nodes/Heading";
import Idea from "@/components/nodes/Idea";
import IdeaContainer from "@/components/nodes/IdeaContainer";
import Paragraph from "@/components/nodes/Paragraph";
import { Editor, Node, Range, Transforms, Element, Path } from "slate";
import { areEquivalent } from "./helpers";
import ListItem from "@/components/nodes/ListItem";
import ListOrdered from "@/components/nodes/ListOrdered";
import ListUnordered from "@/components/nodes/ListUnordered";

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
	editor: Editor,
	mode: string
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
					mode={mode}
				>
					{children}
				</IdeaContainer>
			);
		case "idea":
			return (
				<Idea {...attributes} editor={editor} node={element} mode={mode}>
					{children}
				</Idea>
			);
		case "paragraph":
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
		case "heading":
			return (
				<Heading {...attributes} editor={editor} node={element} mode={mode}>
					{children}
				</Heading>
			);
		case "list-item-ordered" || "list-item-unordered":
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
		case "list-ordered":
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
		case "list-unordered":
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
		default:
			return null;
	}
};

const renderLeaf = (props: any, editor: Editor, mode: string) => {
	return (
		<span
			{...props.attributes}
			style={{
				fontWeight: props.leaf.bold ? "bold" : "normal",
				fontStyle: props.leaf.italic ? "italic" : "normal",
				textDecoration: props.leaf.strikethrough ? "line-through" : "none",
				backgroundColor: props.leaf.code ? "grey" : "transparent",
			}}
		>
			{props.children}
		</span>
	);
};

const onType = (e: React.KeyboardEvent, editor: Editor) => {
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
				// TODO: make type more robust
				Transforms.insertNodes(editor, newItem as unknown as Node, {
					at: [topLevelNode + 1],
				});

				Transforms.select(editor, [topLevelNode + 1]);
			}

			break;
		}
	}

	if (e.ctrlKey) {
		switch (e.key) {
			case "b": {
				e.preventDefault();
				CustomEditor.toggleMark(editor, "bold");
				break;
			}
			case "i": {
				e.preventDefault();
				CustomEditor.toggleMark(editor, "italic");
				break;
			}
			case "~": {
				e.preventDefault();
				CustomEditor.toggleMark(editor, "strikethrough");
				break;
			}
			case "`": {
				e.preventDefault();
				CustomEditor.toggleMark(editor, "code");
				break;
			}
		}
	}
};

const CustomEditor = {
	isParentAList(editor: Editor, nodePath: number[]) {
		const parentPath = Path.parent(nodePath);
		const parentNode = Editor.node(editor, parentPath);
		const parentProperties = parentNode[0];

		return (
			parentNode &&
			parentProperties.type === "list-ordered" &&
			parentProperties.type === "list-unordered"
		);
	},
	newBlockIsSameAsCurrentBlock(node: Node, nodeType: string, options: any) {
		const currNodeOptions: any = { ...node };
		delete currNodeOptions["children"];
		const nodeToCompare = Object.assign(options, { type: nodeType });
		return areEquivalent(currNodeOptions, nodeToCompare);
	},
	toggleBlock(
		nodeType: string,
		editor: Editor,
		path?: number[],
		options?: any
	) {
		var actualPath: number[] = [];
		if (typeof path !== "undefined") actualPath = path;
		else {
			const currentSelection = editor.selection;
			if (currentSelection) {
				const [start] = Range.edges(currentSelection);
				actualPath = [start.path[0]];
			}
		}

		const node = Editor.node(editor, actualPath)[0];
		const newBlockIsSame = CustomEditor.newBlockIsSameAsCurrentBlock(
			node,
			nodeType,
			options
		);

		if (newBlockIsSame) {
			Transforms.setNodes(editor, Object.assign({ type: "paragraph" }), {
				at: actualPath,
			});
		} else {
			Transforms.setNodes(
				editor,
				Object.assign({ type: nodeType }, options),
				{ at: actualPath }
			);
		}

		// if (
		// 	nodeType === "list-item-ordered" ||
		// 	nodeType === "list-item-unordered"
		// ) {
		// 	// if there is not a 'list-ordered' or 'list-unordered' parent node, add one
		// 	const parentPath = Path.parent(actualPath);
		// 	const parentNode = Editor.node(editor, parentPath);
		// 	const parentProperties = parentNode[0];

		// 	if (
		// 		parentNode &&
		// 		parentProperties.type !== "list-ordered" &&
		// 		parentProperties.type !== "list-unordered"
		// 	) {
		// 		Transforms.wrapNodes(
		// 			editor,
		// 			{
		// 				type:
		// 					nodeType === "list-item-ordered"
		// 						? "list-ordered"
		// 						: "list-unordered",
		// 				children: [],
		// 			},
		// 			{ at: actualPath }
		// 		);
		// 	}
		// } else {
		// 	// if the parent node is a 'list-ordered' or 'list-unordered' node, remove it
		// 	const parent = Node.parent(editor, actualPath);
		// 	console.log(parent);
		// 	if (
		// 		parent &&
		// 		parent[0] &&
		// 		(parent[0].type === "list-ordered" ||
		// 			parent[0].type === "list-unordered")
		// 	) {
		// 		Transforms.unwrapNodes(editor, { at: actualPath });
		// 	}
		// }

		// // untoggle block

		// Transforms.setNodes(editor, Object.assign({ type: "paragraph" }), {
		// 	at: actualPath,
		// });

		// if (nodeType.startsWith("list")) {
		// 	for (let i = 0; i < node.children.length; i++) {
		// 		Transforms.setNodes(
		// 			editor,
		// 			Object.assign({ type: "paragraph" }),
		// 			{
		// 				at: [...actualPath, i],
		// 			}
		// 		);
		// 	}
		// }
	},
	isMarkActive(editor: Editor, markType: string) {
		const marks = Editor.marks(editor);
		// TODO: make mark type more robust
		return marks ? (marks as any)[markType] === true : false;
	},
	toggleMark(editor: Editor, markType: string) {
		const newBlockIsSame = CustomEditor.isMarkActive(editor, markType);
		if (newBlockIsSame) {
			Editor.removeMark(editor, markType);
		} else {
			Editor.addMark(editor, markType, true);
		}
	},
};

export { renderElement, renderLeaf, onType, CustomEditor };
