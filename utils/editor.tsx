import Heading from "@/components/nodes/Heading";
import Idea from "@/components/nodes/Idea";
import IdeaContainer from "@/components/nodes/IdeaContainer";
import Paragraph from "@/components/nodes/Paragraph";
import { Editor, Node, Range, Transforms, Element, Path, node } from "slate";
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
		case "list-ordered-item" || "list-unordered-item":
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
				const nodePath = selection.anchor.path.slice(0, -2);
				const node = Editor.node(editor, nodePath)[0];
				const deepestNodeIndex = nodePath[nodePath.length - 1];
				const rootNodePath = nodePath[0];
				const rootNode = Editor.node(editor, [rootNodePath])[0];

				let newItem = {
					type: "paragraph",
					children: [
						{
							type: "text",
							children: [{ text: "" }],
						},
					],
				};
				let insertPath = [rootNodePath + 1];

				if (
					LIST_TYPES.includes(rootNode.type) &&
					node.children[0].children[0].text
				) {
					newItem = {
						type: Editor.node(editor, [rootNodePath])[0].type + "-item",
						children: [
							{
								type: "text",
								children: [{ text: "" }],
							},
						],
					};

					insertPath = [rootNodePath, deepestNodeIndex + 1];
				} else if (!node.children[0].children[0].text) {
					// If the current node is empty, remove it and insert the new node in its place
					Transforms.removeNodes(editor, { at: nodePath });
				}

				// Insert the new sub-item node at the end of the container's children
				// TODO: make type more robust
				Transforms.insertNodes(editor, newItem as unknown as Node, {
					at: insertPath,
				});

				Transforms.select(editor, insertPath);
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

export const LIST_TYPES = ["list-ordered", "list-unordered"];
export const LIST_ITEMS = ["list-ordered-item", "list-unordered-item"];

const CustomEditor = {
	isBlockAList(editor: Editor, blockPath: number[]) {
		const block = Editor.node(editor, blockPath);
		const blockProperties = block[0];

		return block && LIST_TYPES.includes(blockProperties.type as string);
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

				// remove the two trailing 'text' nodes from the path
				actualPath = start.path.slice(0, -2);
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

		// if we are toggling a list item
		if (LIST_ITEMS.includes(nodeType)) {
			const LIST_WRAPPER_TYPE = nodeType.slice(
				0,
				nodeType.lastIndexOf("-item")
			);

			if (!this.isBlockAList(editor, [actualPath[0]])) {
				// if there is not a 'list-ordered' or 'list-unordered' parent node, add one

				Transforms.wrapNodes(
					editor,
					{
						type: LIST_WRAPPER_TYPE,
						children: [],
					},
					{ at: actualPath }
				);
			} else {
				// if there is a 'list-ordered' or 'list-unordered' parent node, split the list at the
				// selected child, creating a list above (if there are children before this) and one
				// below (if there are children after this) and change the selected child into a paragraph
				// in the middle of the (up to) two lists

				const childIndex = actualPath[actualPath.length - 1];

				// move child from its parent to before its parent
				Transforms.moveNodes(editor, {
					at: actualPath,
					to: [actualPath[0]],
				});

				// set the child to type paragraph
				Transforms.setNodes(
					editor,
					{ type: "paragraph" },
					{ at: [actualPath[0]] }
				);

				// if the remaining list contains no children, remove it
				if (!Editor.node(editor, [actualPath[0] + 1])[0].children[0].text) {
					Transforms.removeNodes(editor, { at: [actualPath[0] + 1] });
				}
			}
		}
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
