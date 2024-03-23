import { Editor, Transforms, Node, Element } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

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

const LIST_ITEMS = ["list-ordered-item", "list-unordered-item"];
const LIST_TYPES = ["list-ordered", "list-unordered"];

// TODO: make sure options are removed from a node if not applicable to that node type

// TODO: add types for both Elements and Element types everywhere in this file

// TODO: make types available for node components

// TODO: change string types to enums

// TODO: make node options more robust

// TODO: set return types for all functions

export const EditorInterface = {
	//#region Core interfaces
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
	getNodePath(editorState: Editor, node: Node) {
		return ReactEditor.findPath(editorState, node);
	},
	getNodeType(node: Node) {
		if (!node || !Element.isElement(node)) return "undefined";
		return node.type;
	},
	getNodeParent(editorState: Editor, node: Node) {
		const path = ReactEditor.findPath(editorState, node);
		return Editor.node(editorState, path.slice(0, -1))[0];
	},
	getNodeChildren(node: Node): Node[] {
		return Array.from(Node.children(node, [])).map(([node]) => node);
	},
	getNodeContent(node: Node) {
		// TODO: make issues with if has multiple children more robust
		return Node.string(node);
	},
	setNodeType(editorState: Editor, node: Node, type: string, options?: any) {
		// TODO: need to remove options if not applicable to the new node type
		Transforms.setNodes(
			editorState,
			{ type: type, ...options },
			{ at: ReactEditor.findPath(editorState, node) }
		);
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
	deleteNode(editorState: Editor, node: Node) {
		Transforms.removeNodes(editorState, {
			at: ReactEditor.findPath(editorState, node),
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
	isMarkActive(editorState: Editor, markType: string) {
		const marks = Editor.marks(editorState);
		// TODO: make mark type more robust
		return marks ? (marks as any)[markType] === true : false;
	},
	//#endregion

	//#region Cursor and selection interfaces
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
	//#endregion

	//#region List interfaces
	isNodeAList(node: Node | string) {
		if (typeof node === "string") return LIST_TYPES.includes(node);
		return LIST_TYPES.includes(EditorInterface.getNodeType(node));
	},
	getCorrespondingListType(node: Node | string) {
		if (typeof node === "string") {
			if (node === "list-ordered-item") return "list-ordered";
			if (node === "list-unordered-item") return "list-unordered";
		} else {
			if (EditorInterface.getNodeType(node) === "list-ordered-item")
				return "list-ordered";
			if (EditorInterface.getNodeType(node) === "list-unordered-item")
				return "list-unordered";
		}
		return "paragraph";
	},
	isNodeAListItem(node: Node | string) {
		if (typeof node === "string") return LIST_ITEMS.includes(node);
		return LIST_ITEMS.includes(EditorInterface.getNodeType(node));
	},
	getCorrespondingListItemType(node: Node | string) {
		if (typeof node === "string") {
			if (node === "list-ordered") return "list-ordered-item";
			if (node === "list-unordered") return "list-unordered-item";
		} else {
			if (EditorInterface.getNodeType(node) === "list-ordered")
				return "list-ordered-item";
			if (EditorInterface.getNodeType(node) === "list-unordered")
				return "list-unordered-item";
		}
		return "paragraph";
	},
	getIndexOfCurrentListItem(editorState: Editor) {
		// if root node is a list, return the index of the current list item
		const rootNode = EditorInterface.getSelectedRootNode(editorState);
		if (rootNode && EditorInterface.isNodeAList(rootNode.node)) {
			const cursorPath = EditorInterface.getCursorPosition(editorState).path;
			return cursorPath[1];
		}
		return -1;
	},
	isNodeWrappedInList(editorState: Editor, node: Node) {
		const parent = EditorInterface.getNodeParent(editorState, node);
		if (!parent) return false;

		if (EditorInterface.isNodeAList(parent)) return true;
		return false;
	},
	insertListWrapper(
		editorState: Editor,
		nodeToWrap: Node,
		wrapperType: string
	) {
		Transforms.wrapNodes(
			editorState,
			{ type: wrapperType, children: [] },
			{ at: ReactEditor.findPath(editorState, nodeToWrap) }
		);
	},
	//#endregion
};

// newBlockIsSameAsCurrentBlock(node: Node, nodeType: string, options: any) {
// 	const currNodeOptions: any = { ...node };
// 	delete currNodeOptions["children"];
// 	const nodeToCompare = Object.assign(options, { type: nodeType });
// 	return areEquivalent(currNodeOptions, nodeToCompare);
// },
