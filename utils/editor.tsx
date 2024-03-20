import Heading from "@/components/nodes/Heading";
import Idea from "@/components/nodes/Idea";
import IdeaContainer from "@/components/nodes/IdeaContainer";
import Paragraph from "@/components/nodes/Paragraph";
import { Editor, Node, Range, Transforms, Descendant } from "slate";
import { areEquivalent } from "./helpers";
import ListItem from "@/components/nodes/ListItem";
import ListOrdered from "@/components/nodes/ListOrdered";
import ListUnordered from "@/components/nodes/ListUnordered";
import Blockquote from "@/components/nodes/Blockquote";
import Codeblock from "@/components/nodes/Codeblock";
import Image from "@/components/nodes/Image";

export const LIST_TYPES = ["list-ordered", "list-unordered"];
export const LIST_ITEMS = ["list-ordered-item", "list-unordered-item"];

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
		case "list-ordered-item":
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
		case "list-unordered-item":
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
		case "image":
			return (
				<Image {...attributes} editor={editor} node={element} mode={mode}>
					{children}
				</Image>
			);
		case "blockquote":
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
		case "codeblock":
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
			return null;
	}
};

const renderLeaf = (props: any, editor: Editor, mode: string) => {
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

const getSelectedRootNode = (editor: Editor) => {
	const selection = editor.selection;
	if (selection) {
		const nodePath = selection.anchor.path.slice(0, -2);
		const rootNode = Editor.node(editor, nodePath)[0];
		const rootNodePath = nodePath[0];

		return {
			node: rootNode,
			index: rootNodePath,
			path: nodePath,
		};
	}
	return null;
};

const getCursorPosition = (editor: Editor) => {
	const selection = editor.selection;
	if (selection) {
		return { index: selection.anchor.offset, path: selection.anchor.path };
	}
	return {
		index: -1,
		path: [],
	};
};

const generateNewNode = (content: string) => {
	return {
		type: "paragraph",
		children: [
			{
				type: "text",
				children: [
					{
						text: content,
					},
				],
			},
		],
	};
};

const onType = (e: React.KeyboardEvent, editor: Editor) => {
	switch (e.key) {
		case "Enter": {
			e.preventDefault();

			// get the outer parent node of the current selection
			const containerNode = getSelectedRootNode(editor);
			if (!containerNode) break;
			const {
				node: rootNode,
				index: rootNodeIndex,
				path: rootNodePath,
			} = containerNode;

			// if inside a codeblock, insert a new line within the block
			if (CustomEditor.isBlockACodeblock(editor, rootNodePath)) {
				Transforms.insertText(editor, "\n");
				return;
			}

			// get index of cursor inside node
			const { index: cursorOffset, path: cursorPath } =
				getCursorPosition(editor);
			const nodeContent = Node.string(rootNode);
			let newItem = generateNewNode(
				nodeContent.substring(cursorOffset, nodeContent.length)
			);
			let insertPath = [rootNodeIndex + 1];

			Transforms.insertText(editor, nodeContent.slice(0, cursorOffset), {
				at: cursorPath,
			});

			// get the path of the deepest child in the selection
			const deepestNodeIndex = rootNodePath[rootNodePath.length - 1];

			if (
				LIST_TYPES.includes(rootNode.type) &&
				rootNode.children[0].children[0].text
			) {
				insertPath = [rootNodeIndex, deepestNodeIndex + 1];
				newItem.type = rootNode.type;
			} else if (
				!rootNode.children[0].children[0].text &&
				rootNode.children.length - 1 &&
				deepestNodeIndex
			) {
				CustomEditor.splitList(editor, rootNodeIndex, deepestNodeIndex);
			}

			// Insert the new sub-item node at the end of the container's children
			// TODO: make type more robust
			Transforms.insertNodes(editor, newItem as unknown as Node, {
				at: insertPath,
			});

			Transforms.select(editor, insertPath);
			Transforms.collapse(editor, { edge: "start" });

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

const onChange = (value: Descendant[], editor: Editor) => {
	// check if there are adjacent lists and merge them
	for (let i = 0; i < value.length; i++) {
		const node = value[i];
		const nextNode = value[i + 1];

		if (LIST_TYPES.includes(node.type) && node.type === nextNode.type) {
			CustomEditor.mergeLists(editor, i);
			return;
		}
	}
};

// TODO: make sure options are removed from a node if not applicable to that node type

const CustomEditor = {
	isBlockAList(editor: Editor, blockPath: number[]) {
		const block = Editor.node(editor, blockPath);
		const blockProperties = block[0];

		return block && LIST_TYPES.includes(blockProperties.type as string);
	},
	isBlockACodeblock(editor: Editor, blockPath: number[]) {
		const block = Editor.node(editor, blockPath);
		const blockProperties = block[0];

		return block && blockProperties.type === "codeblock";
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
		if (LIST_ITEMS.includes(nodeType) || LIST_ITEMS.includes(node.type)) {
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
				this.splitList(editor, actualPath[0], actualPath[1], nodeType);
			}
		}
	},
	appendBlock(node: Object, editor: Editor, path?: number[], options?: any) {
		var actualPath: number[] = [];
		if (typeof path !== "undefined") actualPath = path;
		else {
			const selection = editor.selection;
			if (!selection) return;
			const nodePath = selection.anchor.path.slice(0, -2);
			const rootNodePath = nodePath[0];
			actualPath = [rootNodePath];
		}

		console.log(actualPath, node);

		Transforms.insertNodes(editor, node as unknown as Node, {
			at: actualPath,
		});
	},
	splitList(
		editor: Editor,
		rootNodeIndex: number,
		listItemIndex: number,
		newNodeType?: string
	) {
		const beforeListNode = Editor.node(editor, [rootNodeIndex])[0];

		const beforeList = {
			type: beforeListNode.type,
			children: [],
		};

		for (let i = 0; i < listItemIndex; i++) {
			const listItem = Editor.node(editor, [rootNodeIndex, i])[0];
			beforeList.children.push(listItem);
		}

		const afterList = {
			type: beforeListNode.type,
			children: [],
		};

		for (
			let i = listItemIndex + 1;
			i < Editor.node(editor, [rootNodeIndex])[0].children.length;
			i++
		) {
			const listItem = Editor.node(editor, [rootNodeIndex, i])[0];
			afterList.children.push(listItem);
		}

		const listItemNode = Editor.node(editor, [
			rootNodeIndex,
			listItemIndex,
		])[0];
		const { type, children, ...options } = listItemNode;

		let newNode = {};
		if (!newNodeType) {
			newNode = {
				type: LIST_ITEMS.includes(listItemNode.type)
					? "paragraph"
					: listItemNode.type,
				children: [
					{
						type: "text",
						children: [{ text: Node.string(listItemNode) }],
					},
				],
				...options,
			};
		} else {
			newNode = {
				type: newNodeType.slice(0, newNodeType.lastIndexOf("-item")),
				children: [
					{
						type: newNodeType,
						children: [
							{
								type: "text",
								children: [{ text: Node.string(listItemNode) }],
							},
						],
						...options,
					},
				],
			};
		}

		Transforms.delete(editor, { at: [rootNodeIndex] });

		let insertIndex = rootNodeIndex;
		let selectIndex = rootNodeIndex;

		if (beforeList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editor, beforeList as unknown as Node, {
				at: [insertIndex++],
			});
			selectIndex++;
		}

		if (Node.string(listItemNode) !== "") {
			Transforms.insertNodes(editor, newNode as unknown as Node, {
				at: [insertIndex++],
			});
		}

		if (afterList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editor, afterList as unknown as Node, {
				at: [insertIndex],
			});
		}

		Transforms.select(editor, [selectIndex]);
		Transforms.collapse(editor, { edge: "end" });
	},
	mergeLists(editor: Editor, beforeListIndex: number) {
		const beforeList = Editor.node(editor, [beforeListIndex])[0];
		const afterList = Editor.node(editor, [beforeListIndex + 1])[0];

		const newList = {
			type: beforeList.type,
			children: [],
		};

		for (let i = 0; i < beforeList.children.length; i++) {
			const listItem = Editor.node(editor, [beforeListIndex, i])[0];
			newList.children.push(listItem);
		}

		for (let i = 0; i < afterList.children.length; i++) {
			const listItem = Editor.node(editor, [beforeListIndex + 1, i])[0];
			newList.children.push(listItem);
		}

		const selection = editor.selection;
		const pathExists = Node.isNode(selection?.anchor.path);

		// if selection is above list, set selection to the first element of the list
		let selectIndex = 0;
		if (
			!pathExists &&
			selection &&
			selection.anchor.path[0] > beforeListIndex
		) {
			selectIndex = newList.children.length - 1;
		} else if (pathExists && selection) {
			selectIndex = selection.anchor.path[1];
		}

		Transforms.delete(editor, { at: [beforeListIndex] });
		Transforms.delete(editor, { at: [beforeListIndex] });

		if (newList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editor, newList as unknown as Node, {
				at: [beforeListIndex],
			});
		}

		Transforms.select(editor, [beforeListIndex, selectIndex]);
		Transforms.collapse(editor, { edge: "end" });
	},
	isMarkActive(editor: Editor, markType: string) {
		const marks = Editor.marks(editor);
		// TODO: make mark type more robust
		return marks ? (marks as any)[markType] === true : false;
	},
	toggleMark(editor: Editor, markType: string, options: any) {
		const newBlockIsSame = CustomEditor.isMarkActive(editor, markType);
		if (newBlockIsSame) {
			Editor.removeMark(editor, markType);
		} else if (options) {
			Editor.addMark(editor, markType, options);
		} else {
			Editor.addMark(editor, markType, true);
		}
	},
};

export { renderElement, renderLeaf, onType, onChange, CustomEditor };
