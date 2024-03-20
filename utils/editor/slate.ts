import { Editor, Range, Transforms, Node } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

import { areEquivalent } from "../helpers";

type CustomElement = {
	type: string;
	children: CustomElement[] | CustomText[];
};

type CustomText = { text: string };

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Node: CustomElement;
		Text: CustomText;
	}
}

export const LIST_ITEMS = ["list-ordered-item", "list-unordered-item"];
export const LIST_TYPES = ["list-ordered", "list-unordered"];

// TODO: make sure options are removed from a node if not applicable to that node type

export const EditorInterface = {
	getSelectedRootNode(editor: Editor) {
		const selection = editor.selection;
		if (selection) {
			const nodeIndex = selection.anchor.path[0];
			const node = Editor.node(editor, [nodeIndex])[0];

			return {
				node: node,
				index: nodeIndex,
				path: [nodeIndex],
			};
		}
		return null;
	},

	getNodeAtPosition(editor: Editor, path: number[]): Node {
		return Editor.node(editor, path)[0];
	},

	getCursorPosition(editor: Editor) {
		const selection = editor.selection;
		if (selection) {
			return { index: selection.anchor.offset, path: selection.anchor.path };
		}
		return {
			index: -1,
			path: [],
		};
	},

	getNodeContent(node: Node) {
		// TODO: make issues with if has multiple children more robust
		return Node.string(node);
	},

	getNodeType(node: Node) {
		if (!node) return undefined;
		return node.type;
	},

	generateNewNode(type: string, content: string) {
		const node: Node = {
			type: type,
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
		return node;
	},

	insertNode(editor: Editor, node: Node, path: number[]) {
		// Insert the new sub-item node at the end of the container's children
		// TODO: make type more robust
		Transforms.insertNodes(editor, node, {
			at: path,
		});
	},

	insertText(editor: Editor, content: string, path: number[]) {
		Transforms.insertText(editor, content, {
			at: path,
		});
	},

	setCursor(editor: Editor, path: number[]) {
		Transforms.select(editor, path);
		Transforms.collapse(editor, { edge: "start" });
	},

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
		const newBlockIsSame = EditorInterface.newBlockIsSameAsCurrentBlock(
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

		Transforms.insertNodes(editor, node as unknown as Node, {
			at: actualPath,
		});
	},

	getListItemType(node: Node) {
		if (EditorInterface.getNodeType(node) === "list-ordered") {
			return "list-ordered-item";
		} else if (EditorInterface.getNodeType(node) === "list-unordered") {
			return "list-unordered-item";
		}

		return "paragraph";
	},

	getNumberOfListItems(node: Node) {
		// TODO: change to custom type for lists
		return node.children.length;
	},

	getIndexOfCurrentListItem(editor: Editor) {
		// TODO: make sure inside a list
		const selection = editor.selection;
		if (!selection) return -1;
		return selection.anchor.path[1];
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

	toggleMark(editor: Editor, markType: string, options?: any) {
		const newBlockIsSame = EditorInterface.isMarkActive(editor, markType);
		if (newBlockIsSame) {
			Editor.removeMark(editor, markType);
		} else if (options) {
			Editor.addMark(editor, markType, options);
		} else {
			Editor.addMark(editor, markType, true);
		}
	},
};
