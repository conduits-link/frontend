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

// TODO: add types for both Elements and Element types everywhere in this file

export const EditorInterface = {
	getSelectedRootNode(editorState: Editor) {
		const selection = editorState.selection;
		if (selection) {
			const nodeIndex = selection.anchor.path[0];
			const node = Editor.node(editorState, [nodeIndex])[0];

			return {
				node: node,
				index: nodeIndex,
			};
		}
		return null;
	},

	getNodeAtPosition(editorState: Editor, path: number[]): Node {
		return Editor.node(editorState, path)[0];
	},

	getCursorPosition(editorState: Editor) {
		const selection = editorState.selection;
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

	insertNode(editorState: Editor, node: Node, path: number[]) {
		// Insert the new sub-item node at the end of the container's children
		// TODO: make type more robust
		Transforms.insertNodes(editorState, node, {
			at: path,
		});
	},

	insertText(editorState: Editor, content: string, path: number[]) {
		Transforms.insertText(editorState, content, {
			at: path,
		});
	},

	setCursor(editorState: Editor, path: number[]) {
		Transforms.select(editorState, path);
		Transforms.collapse(editorState, { edge: "start" });
	},

	isBlockAList(editorState: Editor, blockPath: number[]) {
		const block = Editor.node(editorState, blockPath);
		const blockProperties = block[0];

		return block && LIST_TYPES.includes(blockProperties.type as string);
	},

	isBlockACodeblock(editorState: Editor, blockPath: number[]) {
		const block = Editor.node(editorState, blockPath);
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
		editorState: Editor,
		path?: number[],
		options?: any
	) {
		var actualPath: number[] = [];
		if (typeof path !== "undefined") actualPath = path;
		else {
			const currentSelection = editorState.selection;
			if (currentSelection) {
				const [start] = Range.edges(currentSelection);

				// remove the two trailing 'text' nodes from the path
				actualPath = start.path.slice(0, -2);
			}
		}

		const node = Editor.node(editorState, actualPath)[0];
		const newBlockIsSame = EditorInterface.newBlockIsSameAsCurrentBlock(
			node,
			nodeType,
			options
		);

		if (newBlockIsSame) {
			Transforms.setNodes(
				editorState,
				Object.assign({ type: "paragraph" }),
				{
					at: actualPath,
				}
			);
		} else {
			Transforms.setNodes(
				editorState,
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

			if (!this.isBlockAList(editorState, [actualPath[0]])) {
				// if there is not a 'list-ordered' or 'list-unordered' parent node, add one

				Transforms.wrapNodes(
					editorState,
					{
						type: LIST_WRAPPER_TYPE,
						children: [],
					},
					{ at: actualPath }
				);
			} else {
				this.splitList(editorState, actualPath[0], actualPath[1], nodeType);
			}
		}
	},

	appendBlock(
		node: Object,
		editorState: Editor,
		path?: number[],
		options?: any
	) {
		var actualPath: number[] = [];
		if (typeof path !== "undefined") actualPath = path;
		else {
			const selection = editorState.selection;
			if (!selection) return;
			const nodePath = selection.anchor.path.slice(0, -2);
			const rootNodePath = nodePath[0];
			actualPath = [rootNodePath];
		}

		Transforms.insertNodes(editorState, node as unknown as Node, {
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

	nodeIsList(node: Node) {
		return LIST_TYPES.includes(EditorInterface.getNodeType(node));
	},

	getNumberOfListItems(node: Node) {
		// TODO: change to custom type for lists
		return node.children.length;
	},

	getIndexOfCurrentListItem(editorState: Editor) {
		// TODO: make sure inside a list
		const selection = editorState.selection;
		if (!selection) return -1;
		return selection.anchor.path[1];
	},

	splitList(
		editorState: Editor,
		rootNodeIndex: number,
		listItemIndex: number,
		newNodeType?: string
	) {
		const beforeListNode = Editor.node(editorState, [rootNodeIndex])[0];

		const beforeList = {
			type: beforeListNode.type,
			children: [],
		};

		for (let i = 0; i < listItemIndex; i++) {
			const listItem = Editor.node(editorState, [rootNodeIndex, i])[0];
			beforeList.children.push(listItem);
		}

		const afterList = {
			type: beforeListNode.type,
			children: [],
		};

		for (
			let i = listItemIndex + 1;
			i < Editor.node(editorState, [rootNodeIndex])[0].children.length;
			i++
		) {
			const listItem = Editor.node(editorState, [rootNodeIndex, i])[0];
			afterList.children.push(listItem);
		}

		const listItemNode = Editor.node(editorState, [
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

		Transforms.delete(editorState, { at: [rootNodeIndex] });

		let insertIndex = rootNodeIndex;
		let selectIndex = rootNodeIndex;

		if (beforeList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editorState, beforeList as unknown as Node, {
				at: [insertIndex++],
			});
			selectIndex++;
		}

		if (Node.string(listItemNode) !== "") {
			Transforms.insertNodes(editorState, newNode as unknown as Node, {
				at: [insertIndex++],
			});
		}

		if (afterList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editorState, afterList as unknown as Node, {
				at: [insertIndex],
			});
		}

		Transforms.select(editorState, [selectIndex]);
		Transforms.collapse(editorState, { edge: "end" });
	},

	mergeLists(editorState: Editor, beforeListIndex: number) {
		const beforeList = Editor.node(editorState, [beforeListIndex])[0];
		const afterList = Editor.node(editorState, [beforeListIndex + 1])[0];

		const newList = {
			type: beforeList.type,
			children: [],
		};

		for (let i = 0; i < beforeList.children.length; i++) {
			const listItem = Editor.node(editorState, [beforeListIndex, i])[0];
			newList.children.push(listItem);
		}

		for (let i = 0; i < afterList.children.length; i++) {
			const listItem = Editor.node(editorState, [beforeListIndex + 1, i])[0];
			newList.children.push(listItem);
		}

		const selection = editorState.selection;
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

		Transforms.delete(editorState, { at: [beforeListIndex] });
		Transforms.delete(editorState, { at: [beforeListIndex] });

		if (newList.children.length > 0) {
			// TODO: make type more robust
			Transforms.insertNodes(editorState, newList as unknown as Node, {
				at: [beforeListIndex],
			});
		}

		Transforms.select(editorState, [beforeListIndex, selectIndex]);
		Transforms.collapse(editorState, { edge: "end" });
	},

	isMarkActive(editorState: Editor, markType: string) {
		const marks = Editor.marks(editorState);
		// TODO: make mark type more robust
		return marks ? (marks as any)[markType] === true : false;
	},

	toggleMark(editorState: Editor, markType: string, options?: any) {
		const newBlockIsSame = EditorInterface.isMarkActive(
			editorState,
			markType
		);
		if (newBlockIsSame) {
			Editor.removeMark(editorState, markType);
		} else if (options) {
			Editor.addMark(editorState, markType, options);
		} else {
			Editor.addMark(editorState, markType, true);
		}
	},
};
