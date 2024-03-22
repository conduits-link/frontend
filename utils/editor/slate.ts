import { Editor, Range, Transforms, Node, Element } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

import { areEquivalent } from "../helpers";

type CustomElement = {
	type: string;
	children: Node[] | CustomElement[] | CustomText[];
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
	// Core interface
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
	getNodeType(node: Node) {
		if (!node || !Element.isElement(node)) return "undefined";
		return node.type;
	},
	getNodeChildren(node: Node) {
		return [...Node.children(node, [])];
	},
	getNodeContent(node: Node) {
		// TODO: make issues with if has multiple children more robust
		return Node.string(node);
	},
	insertNode(editorState: Editor, node: Node, path: number[]) {
		// Insert the new sub-item node at the end of the container's children
		Transforms.insertNodes(editorState, node, {
			at: path,
		});
	},
	insertText(editorState: Editor, content: string, path: number[]) {
		Transforms.insertText(editorState, content, {
			at: path,
		});
	},
	generateNewNode(parentType: string, childType: string, content: string) {
		const node: Node = {
			type: parentType,
			children: [
				{
					type: childType,
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
	isNodeAList(node: Node) {
		return LIST_TYPES.includes(EditorInterface.getNodeType(node));
	},

	// Cursor and selection interface
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
	setCursor(editorState: Editor, path: number[]) {
		Transforms.select(editorState, path);
		Transforms.collapse(editorState, { edge: "start" });
	},

	// List interface
	isBlockAList(editorState: Editor, blockPath: number[]) {
		const block = Editor.node(editorState, blockPath);
		const blockProperties = block[0];

		return (
			block &&
			LIST_TYPES.includes(
				EditorInterface.getNodeType(blockProperties) as string
			)
		);
	},
	isBlockACodeblock(editorState: Editor, blockPath: number[]) {
		const block = Editor.node(editorState, blockPath);
		const blockProperties = block[0];

		return (
			block && EditorInterface.getNodeType(blockProperties) === "codeblock"
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
		if (
			LIST_ITEMS.includes(nodeType) ||
			LIST_ITEMS.includes(EditorInterface.getNodeType(node))
		) {
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
		node: Node,
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

		Transforms.insertNodes(editorState, node, {
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

		const beforeList: Node = {
			type: EditorInterface.getNodeType(beforeListNode),
			children: Array.from(
				{ length: listItemIndex },
				(_, i) => Editor.node(editorState, [rootNodeIndex, i])[0]
			),
		};

		const newList = EditorInterface.getNodeAtPosition(editorState, [
			rootNodeIndex,
		]);

		const afterList = {
			type: EditorInterface.getNodeType(beforeListNode),
			children: EditorInterface.getNodeChildren(newList)
				.slice(listItemIndex + 1)
				.map((_, i) =>
					EditorInterface.getNodeAtPosition(editorState, [
						rootNodeIndex,
						i + listItemIndex + 1,
					])
				),
		};

		const listItemNode: Node = Editor.node(editorState, [
			rootNodeIndex,
			listItemIndex,
		])[0];

		let newItemType: string = LIST_ITEMS.includes(
			EditorInterface.getNodeType(listItemNode)
		)
			? "paragraph"
			: EditorInterface.getNodeType(listItemNode);
		let newItemChildType = "text";
		if (newNodeType) {
			newItemType = newNodeType.slice(0, newNodeType.lastIndexOf("-item"));
			newItemChildType = newNodeType;
		}

		const newNode = EditorInterface.generateNewNode(
			newItemType,
			newItemChildType,
			EditorInterface.getNodeContent(listItemNode)
		);

		Transforms.delete(editorState, { at: [rootNodeIndex] });

		let insertIndex = rootNodeIndex;
		let selectIndex = rootNodeIndex;

		if (beforeList.children.length > 0) {
			Transforms.insertNodes(editorState, beforeList, {
				at: [insertIndex++],
			});
			selectIndex++;
		}

		if (Node.string(listItemNode) !== "") {
			Transforms.insertNodes(editorState, newNode, {
				at: [insertIndex++],
			});
		}

		if (afterList.children.length > 0) {
			Transforms.insertNodes(editorState, afterList, {
				at: [insertIndex],
			});
		}

		Transforms.select(editorState, [selectIndex]);
		Transforms.collapse(editorState, { edge: "end" });
	},

	mergeLists(editorState: Editor, beforeListIndex: number) {
		const beforeList = Editor.node(editorState, [beforeListIndex])[0];
		const afterList = Editor.node(editorState, [beforeListIndex + 1])[0];

		const beforeListChildren = EditorInterface.getNodeChildren(beforeList);
		const afterListChildren = EditorInterface.getNodeChildren(afterList);

		const newList = {
			type: EditorInterface.getNodeType(beforeList),
			children: beforeListChildren
				.map((_, i) => Editor.node(editorState, [beforeListIndex, i])[0])
				.concat(
					afterListChildren.map(
						(_, i) =>
							Editor.node(editorState, [beforeListIndex + 1, i])[0]
					)
				),
		};

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
			Transforms.insertNodes(editorState, newList, {
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
